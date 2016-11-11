# mbed-js-ble-example

To build:

```
git clone https://github.com/ARMmbed/mbed-js-ble-example
cd mbed-js-ble-example
npm install
gulp --target=NRF52_DK
```

See build/out/NRF52_DK/mbedos5.hex. The application exposes two services, a fake battery service, and a LED service which controls LED1.

## API reference

See [mbed-js-ble](https://github.com/ARMmbed/mbed-js-ble).

## Todo

* Implement 128 bit service & characteristic UUIDs
