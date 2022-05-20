import * as names from 'names.js';

function main() {
    //ending expression with inverted parentheses
    startApplication("SimplePlotter");
    mouseClick(waitForObject(names.mainWindowFunctionLineEditQLineEdit), 29, 14, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), "(x(");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 29, 14, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "0");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 29, 11, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "1");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 76, 11, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 76, 11, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Invalid function expression.");
}
