var blink = require('./flash.js');

var controlLed = DigitalOut(LED1);

var ble = BLEDevice();
var batteryChar = BLECharacteristic('2a19', ['read', 'notify'], 1);
var batteryService = BLEService('180f', [batteryChar]);
var batteryLevel = 100;

var ledChar = BLECharacteristic('9871', ['read', 'write'], 1);
ledChar.onUpdate(function(newValue) {
    print('Updated ledChar, newValue is ' + (newValue[0] ? 'on' : 'off'));
    controlLed.write(newValue[0] ? 0 : 1);
});
var ledService = BLEService('9870', [ ledChar ]);

print('created variables');

ble.onConnection(function() {
    print('GATT connected');
});

ble.onDisconnection(function() {
    print('GATT disconnected');

    ble.startAdvertising();
});

ble.ready(function() {
    print('ble stack ready');
    ble.addServices([
        batteryService,
        ledService
    ]);
    ble.startAdvertising('Battery Device', [
        batteryService.getUUID(),
        ledService.getUUID()
    ]);

    // built-in LED on nRF52 is 0=on, 1=off
    ledChar.write([ controlLed.read() ? 0 : 1 ]);
});

setInterval(function() {
    blink();

    if (ble.isConnected()) {
        batteryChar.write([batteryLevel]);

        batteryLevel--;
        if (batteryLevel <= 0) {
            batteryLevel = 100;
        }
    }
}, 1000);

print('main.js has finished executing.');
