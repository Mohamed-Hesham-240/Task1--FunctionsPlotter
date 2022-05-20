import * as names from 'names.js';

function main() {
    //starting expression with a non-unary operator
    startApplication("SimplePlotter");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "+5");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "<NumPad*>");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "2");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "<NumPad*>");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "x");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 36, 10, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "-10");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 36, 12, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "10");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 59, 17, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 59, 17, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Invalid function expression.");
}
