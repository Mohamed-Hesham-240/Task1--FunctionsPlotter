#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include "Utility.h"

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void createInitialPlot();
    void on_plotPushButton_clicked();
    bool isOperator(QChar c);
    bool isMinMaxValid(QString min, QString max);
    bool isExpressionValid(QString &expression);
    bool isParenthesBalanced(QString &expression);
    void on_clearPushButton_clicked();

    bool isExpressionConstant(QString &expression);
private:
    Ui::MainWindow *ui;
};
#endif // MAINWINDOW_H
