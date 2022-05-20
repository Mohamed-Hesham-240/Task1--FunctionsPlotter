import * as names from 'names.js';

function main() {
    //min value is not a number
    startApplication("SimplePlotter");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 19, 10, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "s");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 14, 3, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "10");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 33, 8, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 33, 8, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Max and min values must be numbers.");
}
