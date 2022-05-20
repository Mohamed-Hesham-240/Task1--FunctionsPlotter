import * as names from 'names.js';

function main() {
    //using consecutive operators
    startApplication("SimplePlotter");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "x++3");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "<NumPad*>");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "2");
    doubleClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 18, 18, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "-10");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 18, 7, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "1");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 37, 21, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 37, 21, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Invalid function expression.");
}
