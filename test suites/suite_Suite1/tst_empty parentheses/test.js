import * as names from 'names.js';

function main() {
    //The expression consists of empty parentheses
    startApplication("SimplePlotter");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "()");
    doubleClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 119, 10, Qt.NoModifier, Qt.LeftButton);
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 86, 11, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "0");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 42, 10, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "1");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 56, 16, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 56, 16, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Invalid function expression.");
}
