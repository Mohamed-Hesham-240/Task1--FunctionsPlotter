import * as names from 'names.js';

function main() {
    //empty min field test case
    startApplication("SimplePlotter");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "10");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 138, 3, Qt.NoModifier, Qt.LeftButton);
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 124, 16, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "10");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowMaxEditLineQLineEdit), QEvent.MouseButtonDblClick, 124, 16, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowMaxEditLineQLineEdit), QEvent.MouseButtonRelease, 124, 16, Qt.LeftButton, 0, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 33, 12, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 33, 12, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Max and min values of x can not be empty.");
}
