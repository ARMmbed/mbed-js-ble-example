var whichLedOn = 0;

// Built-in LEDs are switched on nRF52-DK. Might need to change for your platform...
var LED_OFF = 1;
var LED_ON = 0;

var leds = [ LED2, LED3, LED4 ].map(function(pin, ix) {
  var led = DigitalOut(pin, LED_OFF);
  print("LED " + (ix + 2) + " is " + (led.is_connected() ? "connected" : "not connected"));
  return led;
});

function blink() {
  leds.forEach(function(led, ix) {
    led.write(ix === whichLedOn ? LED_ON : LED_OFF);
  });

  whichLedOn = (whichLedOn + 1) % leds.length;
}

module.exports = blink;

print("blink.js has finished executing.");
