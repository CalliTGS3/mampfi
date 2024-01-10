let UnterbrechungZeit = 0
let UnterbrechungEnde = 0
let IRLichtstaerke = 0
let Unterbrochen = false
let ZeitGrenzwert = 2000
let LichtGrenzwert = 100
let UnterbrechungStart = 0
let UnterbrechungZaehlerEinwurf = 0
let UnterbrechungZaehlerLeeren = 0
serial.redirectToUSB()
let AnzahlTracks = 10
basic.showString("S")
// grove_mp3_v3.queryNumberOfTracks()
basic.forever(function () {
    IRLichtstaerke = pins.analogReadPin(AnalogPin.P1)
    if (IRLichtstaerke >= LichtGrenzwert) {
        Unterbrochen = true
        if (UnterbrechungStart == 0) {
            UnterbrechungStart = control.millis()
        }
    } else {
        Unterbrochen = false
    }
    if (Unterbrochen) {
        UnterbrechungEnde = control.millis()
        UnterbrechungZeit = UnterbrechungEnde - UnterbrechungStart
        if (UnterbrechungZeit > ZeitGrenzwert) {
            UnterbrechungZaehlerLeeren = 1
            UnterbrechungZaehlerEinwurf = 0
        } else {
            UnterbrechungZaehlerEinwurf += 1
        }
    } else {
        UnterbrechungStart = 0
        UnterbrechungEnde = 0
    }
    basic.pause(10)
})
basic.forever(function () {
    if (UnterbrechungZaehlerEinwurf > 0) {
        UnterbrechungZaehlerEinwurf = 0
        basic.showString("E")
        grove_mp3_v3.playTrackByName(randint(2, AnzahlTracks))
    } else if (UnterbrechungZaehlerLeeren > 0) {
        UnterbrechungZaehlerLeeren = 0
        basic.showString("L")
        if (0 % 100 == 1) {
            grove_mp3_v3.playTrackByName(1)
        }
    } else {
        basic.showIcon(IconNames.Happy)
    }
    basic.pause(10)
})
