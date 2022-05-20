import * as names from 'names.js';

function main() {
    //min value of x is greater than the max value
    startApplication("SimplePlotter");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "10");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 21, 6, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "10");
    mouseClick(waitForObject(names.mainWindowCentralwidgetQWidget), 111, 61, Qt.NoModifier, Qt.LeftButton);
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 17, 13, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "5");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 28, 8, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 28, 8, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Min value of x must be less than or equal the max value.");
}
