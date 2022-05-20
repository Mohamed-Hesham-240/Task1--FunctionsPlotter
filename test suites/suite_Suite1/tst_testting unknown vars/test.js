import * as names from 'names.js';

function main() {
    //using variables other than 'x'
    startApplication("SimplePlotter");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), " + ");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "<Backspace>");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "<Backspace>");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "<Backspace>");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "+3");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 29, 15, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "-1-");
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "<Backspace>");
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "0");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 29, 6, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "1");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 43, 9, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 43, 9, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Invalid function expression.");
}
