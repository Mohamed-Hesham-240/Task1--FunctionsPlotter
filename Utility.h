//#pragma once
#include <stack>
#include <string>



class utility {
public:

    static std::string eval(std::string& infixExpression);

private:

	static bool isArithmetiOperator(char c);

    static std::string evaluatePostFix(std::stack<std::string> postFix);

    static std::string extractNumber(int& i, std::string& infixExpression);

	static int getPriority(char c);

    static std::stack<std::string> infixToPostfix(std::string infixExpression);

};
