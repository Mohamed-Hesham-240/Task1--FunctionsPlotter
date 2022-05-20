import * as names from 'names.js';

function main() {
    //empty function field test case
    startApplication("SimplePlotter");
    mouseClick(waitForObject(names.mainWindowMinEditLineQLineEdit), 75, 14, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMinEditLineQLineEdit), "-10");
    mouseClick(waitForObject(names.mainWindowMaxEditLineQLineEdit), 44, 5, Qt.NoModifier, Qt.LeftButton);
    type(waitForObject(names.mainWindowMaxEditLineQLineEdit), "10");
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonPress, 27, 11, Qt.LeftButton, 1, 0);
    sendEvent("QMouseEvent", waitForObject(names.mainWindowPlotPushButtonQPushButton), QEvent.MouseButtonRelease, 27, 11, Qt.LeftButton, 0, 0);
    test.compare(waitForObjectExists(names.simplePlotterQtMsgboxLabelQLabel).text, "The function can not be empty.");
}
