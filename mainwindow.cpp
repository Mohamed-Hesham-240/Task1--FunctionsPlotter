#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <QString>
#include <QVector>
#include <QMessageBox>
#include <QDebug>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    MainWindow::createInitialPlot();
}

MainWindow::~MainWindow()
{
    delete ui;
}

/**
 * Draw the initial plot on the graph
 * @brief MainWindow::createInitialPlot
 */
void MainWindow::createInitialPlot(){
    QVector<double> x, y;
    ui->plot->addGraph();
    ui->plot->graph(0)->setData(x, y);
    ui->plot->xAxis->setLabel("x");
    ui->plot->yAxis->setLabel("y");
    ui->plot->xAxis->setRange(-10, 10);
    ui->plot->yAxis->setRange(-10, 10);
    ui->plot->replot();
}

/**
 * @brief MainWindow::isOperator
 * @param c - Checking if the the QChar is an operator or a dot
 * @return true if the charahcter is an operator or a dot, otherwise false
 */
bool MainWindow::isOperator(QChar c){
    return  c == '+' || c== '-' || c == '*' || c == '/' || c == '^' || c == '.' || c == '(' || c == ')' || c == '#';
}

/**
 * Checking the validation of the min and max values of x
 * @brief MainWindow::isMinMaxValid
 * @param sMin - a QString representing the min value of x
 * @param sMax - a QString representing the max value of x
 * @return true of these values are valid, otherwise false
 */
bool MainWindow::isMinMaxValid(QString sMin, QString sMax){
    if (sMin == "" || sMax==""){
        QMessageBox::warning(this, "Simple Plotter", "Max and min values of x can not be empty.");
        return false;
    }

    bool isMaxDouble = false,
         isMinDouble = false;
    int iMaxX = sMax.toDouble(&isMaxDouble),
        iMinX = sMin.toDouble(&isMinDouble);
    if (!isMaxDouble || !isMinDouble){
           QMessageBox::warning(this, "Simple Plotter", "Max and min values must be numbers.");
           return false;
    }

    if (iMinX > iMaxX){
        QMessageBox::warning(this, "Simple Plotter", "Min value of x must be less than or equal the max value.");
        return false;
    }
    return true;
}

/**
 * Checking the validation function expression
 * @brief MainWindow::isExpressionValid
 * @param expression - the expression to check its validation (by address)
 * @return true if the expression is valid, otherwise false
 */
bool MainWindow::isExpressionValid(QString &expression){
    if (expression == ""){
             QMessageBox::warning(this, "Simple Plotter", "The function can not be empty.");
             return false;
    }
    for (auto character:expression){
        if (!character.isDigit() && character != ' ' && character != 'x' && !isOperator(character) ){
            QMessageBox::warning(this, "Simple Plotter", "Invalid function expression.");
            return false;
        }
    }

    if ((!expression[0].isDigit() && expression[0]!='x' && expression[0] != '#' && expression[0]!='(')
            || (!expression[expression.size() - 1].isDigit() && expression[expression.size() - 1] !='x' && expression[expression.size() - 1] !=')')){
        QMessageBox::warning(this, "Simple Plotter", "Invalid function expression.");
        return false;
    }

    if (!isParenthesBalanced(expression)){
        QMessageBox::warning(this, "Simple Plotter", "Invalid function expression.");
        return false;
    }

    for (int i=0; i<expression.size() - 1;++i){
        if ((expression[i]=='+' ||expression[i]=='-' ||expression[i]=='*' ||expression[i]=='/' ||expression[i]=='^' ||expression[i]=='(')
                && ((i+1) < expression.size() && expression[i+1] == '#')
          )
            continue;

        if ((isOperator(expression[i])&& expression[i] != '.' && expression [i] != ')'&& expression[i+1]=='(')
              || (isOperator(expression[i+1])&& expression[i+1] != '.' && expression [i+1] != '('&& expression[i]==')'))
            continue;

        if (isOperator(expression[i]) && isOperator(expression[i + 1])){
                QMessageBox::warning(this, "Simple Plotter", "Invalid function expression.");
                return false;
         }
    }

    return true;
}

/**
 * Checking the balance of the parenthesis in the expression
 * @brief MainWindow::isParenthesBalanced
 * @param expression - a Qstring represeting the expression to be evaluated (by address)
 * @return true if the parenthesis are balanced, otherwise false
 */
bool MainWindow::isParenthesBalanced(QString &expression){
    QStack<QChar> leftParenthes;
    for (auto character:expression){
        if (character == '('){
            leftParenthes.push('(');
        }
        else if(character == ')'){
            if (leftParenthes.empty())
                return false;
            else
                leftParenthes.pop();
        }
    }
    if (!leftParenthes.empty())
        return false;
    return true;
}

/**
 * Validating the user input, prcess it, and draw the graph
 * @brief MainWindow::on_plotPushButton_clicked
 */
void MainWindow::on_plotPushButton_clicked()
{
    QString sMaxX = ui->maxEditLine->text(),
            sMinX = ui->minEditLine->text(),
            function = ui->functionLineEdit->text();
    function.remove(' ');
    for (int i=0 ; i<function.size()-2;++i){
        if ( (function[i]=='+' ||function[i]=='-' ||function[i]=='*' ||function[i]=='/' ||function[i]=='^' ||function[i]=='(')
             && function[i+1] == '-' && (function[i+2].isDigit()||function[i+2] == 'x')
             )
            function[i+1] = '#';
    }
    if (1 < function.size() && function[0]=='-' && (function[1].isDigit()||function[1] == 'x'))
           function[0] = '#';

    if (!isExpressionValid(function) || !isMinMaxValid(sMinX, sMaxX)){
        return;
    }

    if (isExpressionConstant(function)){
        std::string stdExpression = function.toStdString();
        QString constantY = QString::fromStdString(utility::eval(stdExpression));
        if (constantY == "NaN"){
               QMessageBox::information(this, "Simple Plotter", "The function is undefined.");
               return;
        }
        else if ((constantY.toDouble()) > (10e19) ){
            QMessageBox::information(this, "Simple Plotter", "The function is infinity.");
            return;
        }
        else if ((constantY.toDouble()) < (-10e19) ){
            QMessageBox::information(this, "Simple Plotter", "The function is -infinity.");
            return;
        }
    }
    double iMaxX = sMaxX.toDouble(),
           iMinX = sMinX.toDouble();
    double temp = iMinX;
    QVector<double> x, y;
    while (temp <= iMaxX){
        if (temp > -10e-7 && temp<10e-7)
            temp = 0;
        x.push_back(temp);
        QString sTemp = QString::number(temp);
        QString expression;
        for (int i=0; i<function.size();++i){
            if (function[i] != 'x'){
                expression.push_back(function[i]);
            }
            else{
                int i = 0;
                expression.push_back('(');
                if (sTemp[0] == '-'){
                     expression.push_back('#');
                     i = 1;
                }
                for (i ; i<sTemp.size();++i){
                    expression.push_back(sTemp[i]);
                }
                 expression.push_back(')');
            }
        }
        std::string stdExpression = expression.toStdString();
        QString sYValue = QString::fromStdString(utility::eval(stdExpression));
        if (sYValue == "NaN"){
              temp = temp + 0.01;
              x.pop_back();
              continue;
        }
        double iYValue = sYValue.toDouble();
        y.push_back(iYValue);
        temp = temp + 0.01;
    }
    ui->plot->addGraph();
    ui->plot->graph(0)->setData(x, y);
    ui->plot->xAxis->setLabel("x");
    ui->plot->yAxis->setLabel("y");
    ui->plot->xAxis->setRange(iMinX, iMaxX);
    ui->plot->yAxis->setRange((int)iMinX * 2 - 1 , (int)iMaxX * 2 + 1 );
    ui->plot->replot();
}

/**
 * Clearing the graph
 * @brief MainWindow::on_clearPushButton_clicked
 */
void MainWindow::on_clearPushButton_clicked(){
    ui->plot->graph(0)->data()->clear();
    createInitialPlot();
}

/**
 * Check if the expression is evaluated into a single value (constant)
 * @brief MainWindow::isExpressionConstant
 * @param expression - the expression to check (by refrence)
 * @return true if the expression is constant, otherwise false
 */
bool MainWindow::isExpressionConstant(QString &expression){
    for (int i=0; i<expression.size() ; ++i){
        if (expression[i] == 'x')
            return false;
    }
    return true;
}

