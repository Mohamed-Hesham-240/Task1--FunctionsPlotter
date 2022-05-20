import * as names from 'names.js';

function main() {
    //invalid function input
    startApplication("SimplePlotter");
    mouseClick(waitForObject(names.mainWindowFunctionLineEditQLineEdit), 43, 18, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "safa");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 39, 3, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "10");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 38, 13, Qt.NoModifier, Qt.LeftButton);
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 22, 5, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "23");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 48, 20, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 48, 20, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Invalid function expression.");
}
