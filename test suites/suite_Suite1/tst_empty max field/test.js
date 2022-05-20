import * as names from 'names.js';

function main() {
    //empty max field test case
    startApplication("SimplePlotter");
    mouseClick(waitForObject(names.mainWindowFunctionLineEditQLineEdit), 36, 16, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "<Backspace>");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "0");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 21, 18, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "10");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 53, 10, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 53, 10, Qt.LeftButton, 0, 0);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 0, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 1, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 1, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 4, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 3, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 7, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 7, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 9, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 9, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 11, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 7, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 3, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 2, 0, 1);
    sendEvent("QWheelEvent", waitForObject(names.simplePlotterQtMsgboxButtonboxQDialogButtonBox), 225, 7, 2, 0, 1);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Max and min values of x can not be empty.");
}
