import * as names from 'names.js';

function main() {
    //max value is not a number
    startApplication("SimplePlotter");
    mouseClick(waitForObject(names.mainWindowFunctionLineEditQLineEdit), 55, 12, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "10");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 27, 12, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "10");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 17, 15, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "q.");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 39, 19, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 39, 19, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Max and min values must be numbers.");
}
