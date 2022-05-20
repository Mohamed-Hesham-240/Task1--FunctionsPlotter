import * as names from 'names.js';

function main() {
    //starting expression with inverted parentheses
    startApplication("SimplePlotter");
    type(waitForObject(names.mainWindowFunctionLineEditQLineEdit), ")x+2)");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 26, 0, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "-10");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 17, 15, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "1");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 34, 8, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 34, 8, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "Invalid function expression.");
}
