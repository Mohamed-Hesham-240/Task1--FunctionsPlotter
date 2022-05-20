import * as names from 'names.js';

function main() {
    //unbalanced parenthesis in expression (number of openings != number of closings)
    startApplication("SimplePlotter");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "x+3))");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 37, 7, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "0");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 29, 11, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "1");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 35, 7, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 35, 7, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Invalid function expression.");
}
