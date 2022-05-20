#include "Utility.h"
#include <cmath>
#include<QDebug>
#include<QString>
using namespace std;

/**
 * Evaluates an infix expression represented in a string
 * @brief utility::eval
 * @param infixExpression- an infix arithemtic expression string (by refrence)
 * @return a string repsresenting the result of the arithmetic expression
 */
string utility::eval(string& infixExpression) {
	stack<string> inversePostfix = infixToPostfix(infixExpression)
		, postfix;
	while (!inversePostfix.empty()) {
		postfix.push(inversePostfix.top());
		inversePostfix.pop();
	}
	return evaluatePostFix(postfix);
}

/**
 * Checks if a character is an arthmetic operator
 * @brief utility::isArithmetiOperator
 * @param c - The character to check
 * @return true if the character is an arithmetic operator, otherwise false
 */
bool utility::isArithmetiOperator(char c) {
    return c == '^' || c == '/' || c == '*' || c == '-' || c == '+' || c == '(' || c == ')' || c == '#';
}

/**
 * Evaluates a postFix expression represented in a stack
 * @brief utility::evaluatePostFix
 * @param postFix - a postFix stack representing the postfix expressoin to be evaluated
 * @return a string repsresenting the result of the arithmetic expression
 */
string utility::evaluatePostFix(stack<string> postFix) {
	stack<double> evalStack;
	while (!postFix.empty()) {
		string top = postFix.top();
		postFix.pop();
        if (isArithmetiOperator(top[0])) {
            double val1 = evalStack.top();
                    evalStack.pop();
                    double val2 = 0;
                    if (top[0] != '#') {
                        val2 = evalStack.top();
                        evalStack.pop();
                    }
			switch (top[0])
			{
			case '+':
				evalStack.push(val2 + val1);
				break;
			case '-':
				evalStack.push(val2 - val1);
				break;
			case '*':
				evalStack.push(val2 * val1);
				break;
			case '/':
                if (val1 == 0){
                    if (val2 == 0){
                        return "NaN";
                    }
                    else if (val2 > 0) {
                        evalStack.push(10e20);
                        break;
                    }
                    else {
                        evalStack.push(-10e20);
                        break;
                    }
                }
                evalStack.push(val2 / val1);
                break;
			case '^':
				evalStack.push(pow(val2, val1)); //val2 ^ val1
				break;
            case '#':
                evalStack.push(0 - val1); //val2 ^ val1
                break;
			default:
				break;
			}
		}
        else {
			evalStack.push(atof(top.c_str()));
		}
	}
	return to_string(evalStack.top());
}

/**
 * A helper method used to extraxt a number from a string until the pointer points at an arithmetic expression or a space
 * @brief utility::extractNumber
 * @param i - A pointer to determine which character from the expression is currently being scanned (by refrence)
 * @param infixExpression - The string to extract the number from (by refrence)
 * @return A string representing the extracted number
 */
string utility::extractNumber(int& i, string& infixExpression) {
	string re;
	while (i < infixExpression.size() && !isArithmetiOperator(infixExpression[i]) && infixExpression[i] != ' ') {
		re.push_back(infixExpression[i]);
		++i;
	}
    return re;
}

/**
 * Determine the priority of an operator
 * @brief utility::getPriority
 * @param c - the character operator to check to its priority
 * @return an integer representing the priority of the operator
 */
int utility::getPriority(char c) {
	switch (c)
	{
	case '+':
		return 1;
	case '-':
		return 1;
	case '*':
		return 2;
	case '/':
		return 2;
    case '#':
		return 3;
    case '^':
        return 4;
	default:
		break;
	}
}


/**
 * convets an infix expression to a postfix represented in a stack
 * @brief utility::infixToPostfix
 * @param infixExpression - An infix arithmetic expression string to be written in postfix
 * @return A stack representing the postfix expression
 */
stack<string> utility::infixToPostfix(string infixExpression) {
	string postExpression;
	stack <string> inversePostfix;
	stack<char>operatorStack;
	int i = 0;
	while (i < infixExpression.size()) {
		if (infixExpression[i] == ' ') {
			++i;
			continue;
		}
		string current;
		if (isArithmetiOperator(infixExpression[i])) {//operator
			current.push_back(infixExpression[i]);
			if (current[0] == ')') {
				while (operatorStack.top() != '(') {
					postExpression.push_back(operatorStack.top());
					postExpression.push_back(' ');
					string t;
					t.push_back(operatorStack.top());
					inversePostfix.push(t);
					operatorStack.pop();
				}
				operatorStack.pop();
			}
			else {
				bool skip = false;
				if (operatorStack.empty() || operatorStack.top() == '(' || current[0] == '(' || getPriority(current[0]) > getPriority(operatorStack.top())) {
					operatorStack.push(current[0]);
					skip = true;
				}
				else if (getPriority(current[0]) < getPriority(operatorStack.top())) {
					while (!operatorStack.empty() && operatorStack.top() != '(' && getPriority(current[0]) < getPriority(operatorStack.top())) {
						postExpression.push_back(operatorStack.top());
						postExpression.push_back(' ');
						string t;
						t.push_back(operatorStack.top());
						inversePostfix.push(t);
						operatorStack.pop();
					}
				}
				if (!skip) {
					if (operatorStack.empty() || getPriority(current[0]) < getPriority(operatorStack.top())) {
						operatorStack.push(current[0]);
					}
                    else {
						if (current[0] == '^') {
							operatorStack.push('^');
						}
						else {
							while (!operatorStack.empty() && getPriority(current[0]) == getPriority(operatorStack.top())) {
								postExpression.push_back(operatorStack.top());
								postExpression.push_back(' ');
								string t;
								t.push_back(operatorStack.top());
								inversePostfix.push(t);
								operatorStack.pop();
							}
							operatorStack.push(current[0]);
						}

					}
				}
			}
			++i;
		}
        else {
			current = extractNumber(i, infixExpression);
            postExpression.append(current);
			postExpression.push_back(' ');
			inversePostfix.push(current);
		}
	}
	while (!operatorStack.empty()) {
		postExpression.push_back(operatorStack.top());
		postExpression.push_back(' ');
		string t;
		t.push_back(operatorStack.top());
		inversePostfix.push(t);
		operatorStack.pop();
	}
	return inversePostfix;
}



