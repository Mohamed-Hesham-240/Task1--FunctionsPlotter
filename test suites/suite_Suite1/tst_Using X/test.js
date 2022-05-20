import * as names from 'names.js';

function main() {
    //using 'X' as the variable
    startApplication("SimplePlotter");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "<NumPad*>");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "2");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 12, 14, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "-1");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 15, 10, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "20");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 27, 6, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 27, 6, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Invalid function expression.");
}
