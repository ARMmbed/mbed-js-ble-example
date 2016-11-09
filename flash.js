var led = 0;

// Setting the pin to 0 turns the LED on
var led_off = 1;
var led_on = 0;

var digital_outs = [];

var leds = [LED2, LED3, LED4];

// Uncomment to use the grove color sensor
//ColorSensor.init(D14, D15);

function connect_pins()
{
  print("Creating new DigitalOuts");
  digital_outs = [];
  for (var i = 0; i < 3; i++)
  {
    digital_outs.push(DigitalOut(leds[i], led_off));
    if (digital_outs[i].is_connected())
    {
      print("LED " + i + " is connected.");
    }
    else
    {
      print("LED " + i + " is not connected.");
    }
  }
}

connect_pins();

function blink()
{
  digital_outs[0].write(led_off);
  digital_outs[1].write(led_off);
  digital_outs[2].write(led_off);

  digital_outs[led].write(led_on);

  // print("Finished with LED " + led);
  led = (led + 1) % 3;
}

module.exports = blink;

print("blink.js has finished executing.");
