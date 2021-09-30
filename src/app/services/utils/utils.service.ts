import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  triggerNotification(message: string, duration?: number) {

    const snackBarRef = this._snackBar.open(message, 'dismiss', {
      duration: duration || 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    })

  }

  formatDateString = (date) => {
    return `${new Date(date).toDateString()} ${new Date(date).toLocaleTimeString()}`;
  }

  getSubString = (string, a, b) => {
    return string.substring(a, b)
  }

  getSubStrings = (string, a) => {
    return string.substring(a)
  }

  formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [year, month, day].join("-");

  }

  deleteKeyIfEmpty(obj: any) {
    for (const o in obj) {
      if (obj[o] == null || obj[o].length == 0) {
        delete obj[o];
      }
    }
  }

  async translateWords(words: string) {
    const translatedWord = await this.translate.get(words).toPromise();
    return translatedWord;
  }

  changeTab(id: string, name: string, activeTab: string) {
     var header = document.getElementById(id);
     var status = header.getElementsByClassName(name);
     for (var i = 0; i < status.length; i++) {
       status[i].addEventListener("click", function() {
       var current = document.getElementsByClassName(activeTab);
       current[0].className = current[0].className.replace(activeTab, "");
       this.className += activeTab;
       });
     }
  }


  countriesAndCodes: any[] = [
    {
         "id": 0,
         "name": "Afghanistan",
         "nationality": "Afghan",
         "iso3": "afg",
         "iso2": "af",
         "locale_code": [
              ""
         ],
         "phone_code": "93"
    },
    {
         "id": 1,
         "name": "Albania",
         "nationality": "Albanian",
         "iso3": "alb",
         "iso2": "al",
         "phone_code": "355",
         "locale_code": [
              "sq-AL"
         ]
    },
    {
         "id": 2,
         "name": "Algeria",
         "nationality": "Algerian",
         "iso3": "dza",
         "iso2": "dz",
         "phone_code": "213",
         "locale_code": [
              "ar-DZ"
         ]
    },
    {
         "id": 3,
         "name": "Andorra",
         "nationality": "Andorran",
         "iso3": "and",
         "iso2": "ad",
         "phone_code": "376",
         "locale_code": [
              "ca-AD"
         ]
    },
    {
         "id": 4,
         "name": "Angola",
         "nationality": "Angolan",
         "iso3": "ago",
         "iso2": "ao",
         "phone_code": "244",
         "locale_code": [
              "pt-AO"
         ]
    },
    {
         "id": 5,
         "name": "Antigua and Barbuda",
         "nationality": "Antiguans",
         "iso3": "atg",
         "iso2": "ag",
         "locale_code": [
              ""
         ],
         "phone_code": "1-268"
    },
    {
         "id": 6,
         "name": "Argentina",
         "nationality": "Argentinean",
         "iso3": "arg",
         "iso2": "ar",
         "phone_code": "54",
         "locale_code": [
              "es-AR"
         ]
    },
    {
         "id": 7,
         "name": "Armenia",
         "nationality": "Armenian",
         "iso3": "arm",
         "iso2": "am",
         "phone_code": "374",
         "locale_code": [
              "am-AM"
         ]
    },
    {
         "id": 8,
         "name": "Australia",
         "nationality": "Australian",
         "iso3": "aus",
         "iso2": "au",
         "phone_code": "61",
         "locale_code": [
              "en-AU"
         ]
    },
    {
         "id": 9,
         "name": "Austria",
         "nationality": "Austrian",
         "iso3": "aut",
         "iso2": "at",
         "phone_code": "43",
         "locale_code": [
              "de-AT"
         ]
    },
    {
         "id": 10,
         "name": "Azerbaijan",
         "nationality": "Azerbaijani",
         "iso3": "aze",
         "iso2": "az",
         "phone_code": "994",
         "locale_code": [
              "az-AZ"
         ]
    },
    {
         "id": 11,
         "name": "Bahamas",
         "nationality": "Bahamian",
         "iso3": "bhs",
         "iso2": "bs",
         "locale_code": [
              ""
         ],
         "phone_code": "1-242"
    },
    {
         "id": 12,
         "name": "Bahrain",
         "nationality": "Bahraini",
         "iso3": "bhr",
         "iso2": "bh",
         "phone_code": "973",
         "locale_code": [
              "ar-BH"
         ]
    },
    {
         "id": 13,
         "name": "Bangladesh",
         "nationality": "Bangladeshi",
         "iso3": "bgd",
         "iso2": "bd",
         "phone_code": "880",
         "locale_code": [
              "bn-BD"
         ]
    },
    {
         "id": 14,
         "name": "Barbados",
         "nationality": "Barbadian",
         "iso3": "brb",
         "locale_code": [
              ""
         ],
         "iso2": "bb",
         "phone_code": "1-246"
    },
    {
         "id": 15,
         "name": "Belarus",
         "nationality": "Belarusian",
         "iso3": "blr",
         "iso2": "by",
         "phone_code": "375",
         "locale_code": [
              "be-BY"
         ]
    },
    {
         "id": 16,
         "name": "Belgium",
         "nationality": "Belgian",
         "iso3": "bel",
         "iso2": "be",
         "phone_code": "32",
         "locale_code": [
              "nl-BE"
         ]
    },
    {
         "id": 17,
         "name": "Belize",
         "nationality": "Belizean",
         "iso3": "blz",
         "iso2": "bz",
         "locale_code": [
              ""
         ],
         "phone_code": "501"
    },
    {
         "id": 18,
         "name": "Benin",
         "nationality": "Beninese",
         "iso3": "ben",
         "locale_code": [
              ""
         ],
         "iso2": "bj",
         "phone_code": "229"
    },
    {
         "id": 19,
         "name": "Bermuda",
         "nationality": "Bermudian",
         "iso3": "bmu",
         "iso2": "bm",
         "locale_code": [
              ""
         ],
         "phone_code": "1-441"
    },
    {
         "id": 20,
         "name": "Bhutan",
         "nationality": "Bhutanese",
         "iso3": "btn",
         "iso2": "bt",
         "locale_code": [
              ""
         ],
         "phone_code": "975"
    },
    {
         "id": 21,
         "name": "Bolivia",
         "nationality": "Bolivian",
         "iso3": "bol",
         "iso2": "bo",
         "phone_code": "591",
         "locale_code": [
              "es-BO"
         ]
    },
    {
         "id": 22,
         "name": "Bosnia and Herzegovina",
         "nationality": "Bosnian",
         "iso3": "bih",
         "iso2": "ba",
         "phone_code": "387",
         "locale_code": [
              "bs-BA"
         ]
    },
    {
         "id": 23,
         "name": "Botswana",
         "nationality": "Batswana",
         "iso3": "bwa",
         "locale_code": [
              ""
         ],
         "iso2": "bw",
         "phone_code": "267"
    },
    {
         "id": 24,
         "name": "Brazil",
         "nationality": "Brazilian",
         "iso3": "bra",
         "iso2": "br",
         "phone_code": "55",
         "locale_code": [
              "pt-BR"
         ]
    },
    {
         "id": 25,
         "name": "Brunei",
         "nationality": "Bruneian",
         "iso3": "brn",
         "iso2": "bn",
         "locale_code": [
              ""
         ],
         "phone_code": "673"
    },
    {
         "id": 26,
         "name": "Bulgaria",
         "nationality": "Bulgarian",
         "iso3": "bgr",
         "iso2": "bg",
         "phone_code": "359",
         "locale_code": [
              "bg-BG"
         ]
    },
    {
         "id": 27,
         "name": "Burkina Faso",
         "nationality": "Burkinabe",
         "iso3": "bfa",
         "iso2": "bf",
         "locale_code": [
              ""
         ],
         "phone_code": "226"
    },
    {
         "id": 28,
         "name": "Burundi",
         "nationality": "Burundian",
         "iso3": "bdi",
         "iso2": "bi",
         "locale_code": [
              ""
         ],
         "phone_code": "257"
    },
    {
         "id": 29,
         "name": "Cambodia",
         "nationality": "Cambodian",
         "iso3": "khm",
         "iso2": "kh",
         "locale_code": [
              ""
         ],
         "phone_code": "855"
    },
    {
         "id": 30,
         "name": "Cameroon",
         "nationality": "Cameroonian",
         "iso3": "cmr",
         "iso2": "cm",
         "locale_code": [
              ""
         ],
         "phone_code": "237"
    },
    {
         "id": 31,
         "name": "Canada",
         "nationality": "Canadian",
         "iso3": "can",
         "iso2": "ca",
         "locale_code": [
              ""
         ],
         "phone_code": "1"
    },
    {
         "id": 32,
         "name": "Cape Verde",
         "nationality": "Cape Verdean",
         "iso3": "cpv",
         "iso2": "cv",
         "locale_code": [
              ""
         ],
         "phone_code": "238"
    },
    {
         "id": 33,
         "name": "Central African Republic",
         "nationality": "Central African",
         "iso3": "caf",
         "iso2": "cf",
         "locale_code": [
              ""
         ],
         "phone_code": "236"
    },
    {
         "id": 34,
         "name": "Chad",
         "nationality": "Chadian",
         "iso3": "tcd",
         "iso2": "td",
         "locale_code": [
              ""
         ],
         "phone_code": "235"
    },
    {
         "id": 35,
         "name": "Chile",
         "nationality": "Chilean",
         "iso3": "chl",
         "iso2": "cl",
         "phone_code": "56",
         "locale_code": [
              "es-CL"
         ]
    },
    {
         "id": 36,
         "name": "China",
         "nationality": "Chinese",
         "iso3": "chn",
         "iso2": "cn",
         "phone_code": "86",
         "locale_code": [
              "zh-CN"
         ]
    },
    {
         "id": 37,
         "name": "Colombia",
         "nationality": "Colombian",
         "iso3": "col",
         "iso2": "co",
         "phone_code": "57",
         "locale_code": [
              "es-CO"
         ]
    },
    {
         "id": 38,
         "name": "Comoros",
         "nationality": "Comoran",
         "iso3": "com",
         "iso2": "km",
         "locale_code": [
              ""
         ],
         "phone_code": "269"
    },
    {
         "id": 39,
         "name": "Congo, Republic of the",
         "nationality": "Congolese",
         "iso3": "cog",
         "iso2": "cg",
         "locale_code": [
              ""
         ],
         "phone_code": "242"
    },
    {
         "id": 40,
         "name": "Congo, Democratic Republic",
         "nationality": "Congolese",
         "iso3": "cod",
         "iso2": "cd",
         "locale_code": [
              ""
         ],
         "phone_code": "243"
    },
    {
         "id": 41,
         "name": "Costa Rica",
         "nationality": "Costa Rican",
         "iso3": "cri",
         "iso2": "cr",
         "phone_code": "506",
         "locale_code": [
              "es-CR"
         ]
    },
    {
         "id": 42,
         "name": "Cote d'Ivoire",
         "nationality": "Ivorian",
         "iso3": "civ",
         "iso2": "ci",
         "locale_code": [
              ""
         ],
         "phone_code": "225"
    },
    {
         "id": 43,
         "name": "Croatia",
         "nationality": "Croatian",
         "iso3": "hrv",
         "iso2": "hr",
         "locale_code": [
              ""
         ],
         "phone_code": "385"
    },
    {
         "id": 44,
         "name": "Cuba",
         "nationality": "Cuban",
         "iso3": "cub",
         "iso2": "cu",
         "locale_code": [
              ""
         ],
         "phone_code": "53"
    },
    {
         "id": 45,
         "name": "Cyprus",
         "nationality": "Cypriot",
         "iso3": "cyp",
         "iso2": "cy",
         "locale_code": [
              ""
         ],
         "phone_code": "357"
    },
    {
         "id": 46,
         "name": "Czech Republic",
         "nationality": "Czech",
         "iso3": "cze",
         "iso2": "cz",
         "phone_code": "420",
         "locale_code": [
              "cs-CZ"
         ]
    },
    {
         "id": 47,
         "name": "Denmark",
         "nationality": "Danish",
         "iso3": "dnk",
         "iso2": "dk",
         "phone_code": "45",
         "locale_code": [
              "da-DK"
         ]
    },
    {
         "id": 48,
         "name": "Djibouti",
         "nationality": "Djibouti",
         "iso3": "dji",
         "iso2": "dj",
         "locale_code": [
              ""
         ],
         "phone_code": "253"
    },
    {
         "id": 49,
         "name": "Dominica",
         "nationality": "Dominican",
         "iso3": "dma",
         "locale_code": [
              ""
         ],
         "iso2": "dm",
         "phone_code": "1-767"
    },
    {
         "id": 50,
         "name": "Dominican Republic",
         "nationality": "Dominican",
         "iso3": "dom",
         "iso2": "do",
         "phone_code": "1-809",
         "locale_code": [
              "es-DO"
         ]
    },
    {
         "id": 51,
         "name": "East Timor",
         "nationality": "East Timorese",
         "iso3": "tls",
         "iso2": "tl",
         "locale_code": [
              ""
         ],
         "phone_code": "670"
    },
    {
         "id": 52,
         "name": "Ecuador",
         "nationality": "Ecuadorean",
         "iso3": "ecu",
         "iso2": "ec",
         "phone_code": "593",
         "locale_code": [
              "es-EC"
         ]
    },
    {
         "id": 53,
         "name": "Egypt",
         "nationality": "Egyptian",
         "iso3": "egy",
         "iso2": "eg",
         "phone_code": "20",
         "locale_code": [
              "ar-EG"
         ]
    },
    {
         "id": 54,
         "name": "El Salvador",
         "nationality": "Salvadoran",
         "iso3": "slv",
         "locale_code": [
              ""
         ],
         "iso2": "sv",
         "phone_code": "503"
    },
    {
         "id": 55,
         "name": "Equatorial Guinea",
         "nationality": "Equatorial Guinean",
         "iso3": "gnq",
         "iso2": "gq",
         "locale_code": [
              ""
         ],
         "phone_code": "240"
    },
    {
         "id": 56,
         "name": "Eritrea",
         "nationality": "Eritrean",
         "iso3": "eri",
         "iso2": "er",
         "locale_code": [
              ""
         ],
         "phone_code": "291"
    },
    {
         "id": 57,
         "name": "Estonia",
         "nationality": "Estonian",
         "iso3": "est",
         "iso2": "ee",
         "phone_code": "372",
         "locale_code": [
              "et-EE"
         ]
    },
    {
         "id": 58,
         "name": "Ethiopia",
         "nationality": "Ethiopian",
         "iso3": "eth",
         "locale_code": [
              ""
         ],
         "iso2": "et",
         "phone_code": "251"
    },
    {
         "id": 59,
         "name": "Fiji",
         "nationality": "Fijian",
         "iso3": "fji",
         "iso2": "fj",
         "phone_code": "679",
         "locale_code": [
              "fj-FJ"
         ]
    },
    {
         "id": 60,
         "name": "Finland",
         "nationality": "Finnish",
         "iso3": "fin",
         "iso2": "fi",
         "phone_code": "358",
         "locale_code": [
              "fi-FI"
         ]
    },
    {
         "id": 61,
         "name": "France",
         "nationality": "French",
         "iso3": "fra",
         "iso2": "fr",
         "phone_code": "33",
         "locale_code": [
              "fr-FR"
         ]
    },
    {
         "id": 62,
         "name": "Gabon",
         "nationality": "Gabonese",
         "iso3": "gab",
         "iso2": "ga",
         "locale_code": [
              ""
         ],
         "phone_code": "241"
    },
    {
         "id": 63,
         "name": "Gambia",
         "nationality": "Gambian",
         "iso3": "gmb",
         "iso2": "gm",
         "locale_code": [
              ""
         ],
         "phone_code": "220"
    },
    {
         "id": 64,
         "name": "Georgia",
         "nationality": "Georgian",
         "iso3": "geo",
         "iso2": "ge",
         "phone_code": "995",
         "locale_code": [
              "ka-GE"
         ]
    },
    {
         "id": 65,
         "name": "Germany",
         "nationality": "German",
         "iso3": "deu",
         "iso2": "de",
         "phone_code": "49",
         "locale_code": [
              "de-DE"
         ]
    },
    {
         "id": 66,
         "name": "Ghana",
         "nationality": "Ghanaian",
         "iso3": "gha",
         "iso2": "gh",
         "phone_code": "233",
         "locale_code": [
              "en-GH"
         ]
    },
    {
         "id": 67,
         "name": "Greece",
         "nationality": "Greek",
         "iso3": "grc",
         "iso2": "gr",
         "phone_code": "30",
         "locale_code": [
              "el-GR"
         ]
    },
    {
         "id": 68,
         "name": "Greenland",
         "nationality": "Greenlander",
         "iso3": "grl",
         "iso2": "gl",
         "phone_code": "299",
         "locale_code": [
              "kl-GL"
         ]
    },
    {
         "id": 69,
         "name": "Grenada",
         "nationality": "Grenadian",
         "iso3": "grd",
         "iso2": "gd",
         "locale_code": [
              ""
         ],
         "phone_code": "1-473"
    },
    {
         "id": 70,
         "name": "Guatemala",
         "nationality": "Guatemalan",
         "iso3": "gtm",
         "iso2": "gt",
         "locale_code": [
              ""
         ],
         "phone_code": "502"
    },
    {
         "id": 71,
         "name": "Guinea",
         "nationality": "Guinean",
         "iso3": "gin",
         "iso2": "gn",
         "locale_code": [
              ""
         ],
         "phone_code": "224"
    },
    {
         "id": 72,
         "name": "Guinea-Bissau",
         "nationality": "Guinea-Bissauan",
         "iso3": "gnb",
         "iso2": "gw",
         "locale_code": [
              ""
         ],
         "phone_code": "245"
    },
    {
         "id": 73,
         "name": "Guyana",
         "nationality": "Guyanese",
         "iso3": "guy",
         "iso2": "gy",
         "locale_code": [
              ""
         ],
         "phone_code": "592"
    },
    {
         "id": 74,
         "name": "Haiti",
         "nationality": "Haitian",
         "iso3": "hti",
         "iso2": "ht",
         "locale_code": [
              ""
         ],
         "phone_code": "509"
    },
    {
         "id": 75,
         "name": "Honduras",
         "nationality": "Honduran",
         "iso3": "hnd",
         "iso2": "hn",
         "phone_code": "504",
         "locale_code": [
              "es-HN"
         ]
    },
    {
         "id": 76,
         "name": "Hungary",
         "nationality": "Hungarian",
         "iso3": "hun",
         "iso2": "hu",
         "phone_code": "36",
         "locale_code": [
              "hu-HU"
         ]
    },
    {
         "id": 77,
         "name": "Iceland",
         "nationality": "Icelander",
         "iso3": "isl",
         "iso2": "is",
         "locale_code": [
              ""
         ],
         "phone_code": "354"
    },
    {
         "id": 78,
         "name": "India",
         "nationality": "Indian",
         "iso3": "ind",
         "iso2": "in",
         "phone_code": "91",
         "locale_code": [
              "en-IN"
         ]
    },
    {
         "id": 79,
         "name": "Indonesia",
         "nationality": "Indonesian",
         "iso3": "idn",
         "iso2": "id",
         "phone_code": "62",
         "locale_code": [
              "id-ID"
         ]
    },
    {
         "id": 80,
         "name": "Iran",
         "nationality": "Iranian",
         "iso3": "irn",
         "iso2": "ir",
         "phone_code": "98",
         "locale_code": [
              "fa-IR"
         ]
    },
    {
         "id": 81,
         "name": "Iraq",
         "nationality": "Iraqi",
         "iso3": "irq",
         "iso2": "iq",
         "phone_code": "964",
         "locale_code": [
              "ar-IQ"
         ]
    },
    {
         "id": 82,
         "name": "Ireland",
         "nationality": "Irish",
         "iso3": "irl",
         "iso2": "ie",
         "phone_code": "353",
         "locale_code": [
              "en-IE"
         ]
    },
    {
         "id": 83,
         "name": "Israel",
         "nationality": "Israeli",
         "iso3": "isr",
         "iso2": "il",
         "phone_code": "972",
         "locale_code": [
              "he-IL"
         ]
    },
    {
         "id": 84,
         "name": "Italy",
         "nationality": "Italian",
         "iso3": "ita",
         "iso2": "it",
         "phone_code": "39",
         "locale_code": [
              "it-IT"
         ]
    },
    {
         "id": 85,
         "name": "Jamaica",
         "nationality": "Jamaican",
         "iso3": "jam",
         "iso2": "jm",
         "locale_code": [
              ""
         ],
         "phone_code": "1-876"
    },
    {
         "id": 86,
         "name": "Japan",
         "nationality": "Japanese",
         "iso3": "jpn",
         "iso2": "jp",
         "phone_code": "81",
         "locale_code": [
              "ja-JP"
         ]
    },
    {
         "id": 87,
         "name": "Jordan",
         "nationality": "Jordanian",
         "iso3": "jor",
         "iso2": "jo",
         "phone_code": "962",
         "locale_code": [
              "ar-JO"
         ]
    },
    {
         "id": 88,
         "name": "Kazakhstan",
         "nationality": "Kazakhstani",
         "iso3": "kaz",
         "iso2": "kz",
         "phone_code": "7",
         "locale_code": [
              "kk-KZ"
         ]
    },
    {
         "id": 89,
         "name": "Kenya",
         "nationality": "Kenyan",
         "iso3": "ken",
         "iso2": "ke",
         "phone_code": "254",
         "locale_code": [
              "en-KE"
         ]
    },
    {
         "id": 90,
         "name": "Kiribati",
         "nationality": "I-Kiribati",
         "iso3": "kir",
         "locale_code": [
              ""
         ],
         "iso2": "ki",
         "phone_code": "686"
    },
    {
         "id": 91,
         "name": "Korea North",
         "nationality": "North Korean",
         "iso3": "prk",
         "iso2": "kp",
         "locale_code": [
              ""
         ],
         "phone_code": "850"
    },
    {
         "id": 92,
         "name": "Korea South",
         "nationality": "South Korean",
         "iso3": "kor",
         "iso2": "kr",
         "phone_code": "82",
         "locale_code": [
              "ko-KR"
         ]
    },
    {
         "id": 93,
         "name": "Kuwait",
         "nationality": "Kuwaiti",
         "iso3": "kwt",
         "iso2": "kw",
         "phone_code": "965",
         "locale_code": [
              "ar-KW"
         ]
    },
    {
         "id": 94,
         "name": "Kyrgyzstan",
         "nationality": "Kyrgyz",
         "iso3": "kgz",
         "iso2": "kg",
         "locale_code": [
              ""
         ],
         "phone_code": "996"
    },
    {
         "id": 95,
         "name": "Laos",
         "nationality": "Laotian",
         "iso3": "lao",
         "iso2": "la",
         "locale_code": [
              ""
         ],
         "phone_code": "856"
    },
    {
         "id": 96,
         "name": "Latvia",
         "nationality": "Latvian",
         "iso3": "lva",
         "iso2": "lv",
         "phone_code": "371",
         "locale_code": [
              "lv-LV"
         ]
    },
    {
         "id": 97,
         "name": "Lebanon",
         "nationality": "Lebanese",
         "iso3": "lbn",
         "iso2": "lb",
         "phone_code": "961",
         "locale_code": [
              "ar-LB"
         ]
    },
    {
         "id": 98,
         "name": "Lesotho",
         "nationality": "Mosotho",
         "iso3": "lso",
         "iso2": "ls",
         "locale_code": [
              ""
         ],
         "phone_code": "266"
    },
    {
         "id": 99,
         "name": "Liberia",
         "nationality": "Liberian",
         "iso3": "lbr",
         "iso2": "lr",
         "locale_code": [
              ""
         ],
         "phone_code": "231"
    },
    {
         "id": 100,
         "name": "Libya",
         "nationality": "Libyan",
         "iso3": "lby",
         "iso2": "ly",
         "phone_code": "218",
         "locale_code": [
              "ar-LY"
         ]
    },
    {
         "id": 101,
         "name": "Liechtenstein",
         "nationality": "Liechtensteiner",
         "iso3": "lie",
         "iso2": "li",
         "locale_code": [
              ""
         ],
         "phone_code": "423"
    },
    {
         "id": 102,
         "name": "Lithuania",
         "nationality": "Lithuanian",
         "iso3": "ltu",
         "iso2": "lt",
         "phone_code": "370",
         "locale_code": [
              "lt-LT"
         ]
    },
    {
         "id": 103,
         "name": "Luxembourg",
         "nationality": "Luxembourger",
         "iso3": "lux",
         "iso2": "lu",
         "phone_code": "352",
         "locale_code": [
              "de-LU"
         ]
    },
    {
         "id": 104,
         "name": "Macedonia",
         "nationality": "Macedonian",
         "iso3": "mkd",
         "iso2": "mk",
         "locale_code": [
              ""
         ],
         "phone_code": "389"
    },
    {
         "id": 105,
         "name": "Madagascar",
         "nationality": "Malagasy",
         "iso3": "mdg",
         "iso2": "mg",
         "phone_code": "261",
         "locale_code": [
              ""
         ]
    },
    {
         "id": 106,
         "name": "Malawi",
         "nationality": "Malawian",
         "iso3": "mwi",
         "iso2": "mw",
         "phone_code": "265",
         "locale_code": [
              ""
         ]
    },
    {
         "id": 107,
         "name": "Malaysia",
         "nationality": "Malaysian",
         "iso3": "mys",
         "iso2": "my",
         "locale_code": [
              ""
         ],
         "phone_code": "60"
    },
    {
         "id": 108,
         "name": "Maldives",
         "nationality": "Maldivan",
         "iso3": "mdv",
         "iso2": "mv",
         "locale_code": [
              ""
         ],
         "phone_code": "960"
    },
    {
         "id": 109,
         "name": "Mali",
         "nationality": "Malian",
         "iso3": "mli",
         "locale_code": [
              ""
         ],
         "iso2": "ml",
         "phone_code": "223"
    },
    {
         "id": 110,
         "name": "Malta",
         "nationality": "Maltese",
         "iso3": "mlt",
         "iso2": "mt",
         "phone_code": "356",
         "locale_code": [
              "en-MT"
         ]
    },
    {
         "id": 111,
         "name": "Marshall Islands",
         "nationality": "Marshallese",
         "iso3": "mhl",
         "iso2": "mh",
         "locale_code": [
              ""
         ],
         "phone_code": "692"
    },
    {
         "id": 112,
         "name": "Mauritania",
         "nationality": "Mauritanian",
         "iso3": "mrt",
         "locale_code": [
              ""
         ],
         "iso2": "mr",
         "phone_code": "322"
    },
    {
         "id": 113,
         "name": "Mauritius",
         "nationality": "Mauritian",
         "iso3": "mus",
         "iso2": "mu",
         "phone_code": "230",
         "locale_code": [
              "en-MU"
         ]
    },
    {
         "id": 114,
         "name": "Mexico",
         "nationality": "Mexican",
         "iso3": "mex",
         "iso2": "mx",
         "phone_code": "52",
         "locale_code": [
              "es-MX"
         ]
    },
    {
         "id": 115,
         "name": "Micronesia",
         "nationality": "Micronesian",
         "iso3": "fsm",
         "iso2": "fm",
         "locale_code": [
              ""
         ],
         "phone_code": "691"
    },
    {
         "id": 116,
         "name": "Moldova",
         "nationality": "Moldovan",
         "iso3": "mda",
         "iso2": "md",
         "locale_code": [
              ""
         ],
         "phone_code": "373"
    },
    {
         "id": 117,
         "name": "Mongolia",
         "nationality": "Mongolian",
         "iso3": "mng",
         "iso2": "mn",
         "locale_code": [
              ""
         ],
         "phone_code": "976"
    },
    {
         "id": 118,
         "name": "Montenegro",
         "nationality": "Montenegrin",
         "iso3": "mne",
         "iso2": "me",
         "locale_code": [
              ""
         ],
         "phone_code": "382"
    },
    {
         "id": 119,
         "name": "Morocco",
         "nationality": "Moroccan",
         "iso3": "mar",
         "iso2": "ma",
         "phone_code": "212",
         "locale_code": [
              "ar-MA"
         ]
    },
    {
         "id": 120,
         "name": "Mozambique",
         "nationality": "Mozambican",
         "iso3": "moz",
         "iso2": "mz",
         "phone_code": "258",
         "locale_code": [
              "mz-MZ"
         ]
    },
    {
         "id": 121,
         "name": "Myanmar",
         "nationality": "Myanma",
         "iso3": "mmr",
         "iso2": "mm",
         "locale_code": [
              ""
         ],
         "phone_code": "95"
    },
    {
         "id": 122,
         "name": "Namibia",
         "nationality": "Namibian",
         "iso3": "nam",
         "iso2": "na",
         "locale_code": [
              ""
         ],
         "phone_code": "264"
    },
    {
         "id": 123,
         "name": "Nauru",
         "nationality": "Nauruan",
         "iso3": "nru",
         "iso2": "nr",
         "locale_code": [
              ""
         ],
         "phone_code": "674"
    },
    {
         "id": 124,
         "name": "Nepal",
         "nationality": "Nepalese",
         "iso3": "npl",
         "iso2": "np",
         "phone_code": "977",
         "locale_code": [
              "ne-NP"
         ]
    },
    {
         "id": 125,
         "name": "Netherlands",
         "nationality": "Dutch",
         "iso3": "nld",
         "iso2": "nl",
         "locale_code": [
              "nl-NL"
         ],
         "phone_code": "31"
    },
    {
         "id": 126,
         "name": "New Zealand",
         "nationality": "New Zealander",
         "iso3": "nzl",
         "iso2": "nz",
         "phone_code": "64",
         "locale_code": [
              "en-NZ"
         ]
    },
    {
         "id": 127,
         "name": "Nicaragua",
         "nationality": "Nicaraguan",
         "iso3": "nic",
         "iso2": "ni",
         "locale_code": [
              ""
         ],
         "phone_code": "505"
    },
    {
         "id": 128,
         "name": "Niger",
         "nationality": "Nigerien",
         "iso3": "ner",
         "iso2": "ne",
         "locale_code": [
              ""
         ],
         "phone_code": "227"
    },
    {
         "id": 129,
         "name": "Nigeria",
         "nationality": "Nigerian",
         "iso3": "nga",
         "iso2": "ng",
         "phone_code": "234",
         "locale_code": [
              "en-NG"
         ]
    },
    {
         "id": 130,
         "name": "Norway",
         "nationality": "Norwegian",
         "iso3": "nor",
         "iso2": "no",
         "phone_code": "47",
         "locale_code": [
              "nn-NO"
         ]
    },
    {
         "id": 131,
         "name": "Oman",
         "nationality": "Omani",
         "iso3": "omn",
         "iso2": "om",
         "phone_code": "968",
         "locale_code": [
              "ar-OM"
         ]
    },
    {
         "id": 132,
         "name": "Pakistan",
         "nationality": "Pakistani",
         "iso3": "pak",
         "iso2": "pk",
         "phone_code": "92",
         "locale_code": [
              "en-PK"
         ]
    },
    {
         "id": 133,
         "name": "Palau",
         "nationality": "Palauan",
         "iso3": "plw",
         "iso2": "pw",
         "locale_code": [
              ""
         ],
         "phone_code": "680"
    },
    {
         "id": 134,
         "name": "Panama",
         "nationality": "Panamanian",
         "iso3": "pan",
         "iso2": "pa",
         "phone_code": "507",
         "locale_code": [
              "es-PA"
         ]
    },
    {
         "id": 135,
         "name": "Papua New Guinea",
         "nationality": "Papua New Guinean",
         "iso3": "png",
         "iso2": "pg",
         "locale_code": [
              ""
         ],
         "phone_code": "675"
    },
    {
         "id": 136,
         "name": "Paraguay",
         "nationality": "Paraguayan",
         "iso3": "pry",
         "iso2": "py",
         "phone_code": "595",
         "locale_code": [
              "es-PY"
         ]
    },
    {
         "id": 137,
         "name": "Peru",
         "nationality": "Peruvian",
         "iso3": "per",
         "iso2": "pe",
         "phone_code": "51",
         "locale_code": [
              "es-PE"
         ]
    },
    {
         "id": 138,
         "name": "Philippines",
         "nationality": "Filipino",
         "iso3": "phl",
         "iso2": "ph",
         "phone_code": "63",
         "locale_code": [
              "en-PH"
         ]
    },
    {
         "id": 139,
         "name": "Poland",
         "nationality": "Polish",
         "iso3": "pol",
         "iso2": "pl",
         "phone_code": "48",
         "locale_code": [
              "pl-PL"
         ]
    },
    {
         "id": 140,
         "name": "Portugal",
         "nationality": "Portuguese",
         "iso3": "prt",
         "iso2": "pt",
         "phone_code": "351",
         "locale_code": [
              "pt-PT"
         ]
    },
    {
         "id": 141,
         "name": "Qatar",
         "nationality": "Qatari",
         "iso3": "qat",
         "iso2": "qa",
         "locale_code": [
              ""
         ],
         "phone_code": "974"
    },
    {
         "id": 142,
         "name": "Romania",
         "nationality": "Romanian",
         "iso3": "rou",
         "iso2": "ro",
         "phone_code": "40",
         "locale_code": [
              "ro-RO"
         ]
    },
    {
         "id": 143,
         "name": "Russia",
         "nationality": "Russian",
         "iso3": "rus",
         "iso2": "ru",
         "phone_code": "7",
         "locale_code": [
              "ru-RU"
         ]
    },
    {
         "id": 144,
         "name": "Rwanda",
         "nationality": "Rwandan",
         "iso3": "rwa",
         "iso2": "rw",
         "phone_code": "250",
         "locale_code": [
              "en-RW"
         ]
    },
    {
         "id": 145,
         "name": "Saint Kiits and Nevis",
         "nationality": "Kittian and Nevisian",
         "iso3": "kna",
         "iso2": "kn",
         "locale_code": [
              ""
         ],
         "phone_code": "1-869"
    },
    {
         "id": 146,
         "name": "Saint Lucia",
         "nationality": "Saint Lucian",
         "iso3": "lca",
         "iso2": "lc",
         "locale_code": [
              ""
         ],
         "phone_code": "1-758"
    },
    {
         "id": 147,
         "name": "Saint Vincent and Grenadines",
         "nationality": "Vincentian",
         "iso3": "vct",
         "iso2": "vc",
         "locale_code": [
              ""
         ],
         "phone_code": "1-784"
    },
    {
         "id": 148,
         "name": "Samoa",
         "nationality": "Samoan",
         "iso3": "wsm",
         "iso2": "ws",
         "locale_code": [
              ""
         ],
         "phone_code": "685"
    },
    {
         "id": 149,
         "name": "San Marino",
         "nationality": "San Marinese",
         "iso3": "smr",
         "iso2": "sm",
         "phone_code": "378",
         "locale_code": [
              "it-SM"
         ]
    },
    {
         "id": 150,
         "name": "Sao Tome",
         "nationality": "Sao Tomean",
         "iso3": "stp",
         "locale_code": [
              ""
         ],
         "iso2": "st",
         "phone_code": "239"
    },
    {
         "id": 151,
         "name": "Saudi Arabia",
         "nationality": "Saudi",
         "iso3": "sau",
         "iso2": "sa",
         "phone_code": "966",
         "locale_code": [
              "ar-SA"
         ]
    },
    {
         "id": 152,
         "name": "Senegal",
         "nationality": "Senegalese",
         "iso3": "sen",
         "locale_code": [
              ""
         ],
         "iso2": "sn",
         "phone_code": "221"
    },
    {
         "id": 153,
         "name": "Serbia and Montenegro",
         "nationality": "Serbian",
         "iso3": "srb",
         "locale_code": [
              ""
         ],
         "iso2": "rs",
         "phone_code": "381"
    },
    {
         "id": 154,
         "name": "Seychelles",
         "nationality": "Seychellois",
         "iso3": "syc",
         "locale_code": [
              ""
         ],
         "iso2": "sc",
         "phone_code": "248"
    },
    {
         "id": 155,
         "name": "Sierra Leone",
         "nationality": "Sierra Leonean",
         "iso3": "sle",
         "iso2": "sl",
         "phone_code": "232",
         "locale_code": [
              "en-SL"
         ]
    },
    {
         "id": 156,
         "name": "Singapore",
         "nationality": "Singaporean",
         "iso3": "sgp",
         "iso2": "sg",
         "phone_code": "65",
         "locale_code": [
              "en-SG"
         ]
    },
    {
         "id": 157,
         "name": "Slovakia",
         "nationality": "Slovakian",
         "iso3": "svk",
         "iso2": "sk",
         "phone_code": "421",
         "locale_code": [
              "sk-SK"
         ]
    },
    {
         "id": 158,
         "name": "Slovenia",
         "nationality": "Slovenian",
         "iso3": "svn",
         "iso2": "si",
         "locale_code": [
              "sl-SI"
         ],
         "phone_code": "386"
    },
    {
         "id": 159,
         "name": "Solomon Islands",
         "nationality": "Solomon Islander",
         "iso3": "slb",
         "iso2": "sb",
         "locale_code": [
              ""
         ],
         "phone_code": "677"
    },
    {
         "id": 160,
         "name": "Somalia",
         "nationality": "Somali",
         "iso3": "som",
         "iso2": "so",
         "locale_code": [
              ""
         ],
         "phone_code": "252"
    },
    {
         "id": 161,
         "name": "South Africa",
         "nationality": "South African",
         "iso3": "zaf",
         "iso2": "za",
         "phone_code": "27",
         "locale_code": [
              "en-ZA"
         ]
    },
    {
         "id": 162,
         "name": "South Sudan",
         "nationality": "South Sudanese",
         "iso3": "ssd",
         "iso2": "ss",
         "locale_code": [
              ""
         ],
         "phone_code": "211"
    },
    {
         "id": 163,
         "name": "Spain",
         "nationality": "Spanish",
         "iso3": "esp",
         "iso2": "es",
         "phone_code": "34",
         "locale_code": [
              "es-ES"
         ]
    },
    {
         "id": 164,
         "name": "Sri Lanka",
         "nationality": "Sri Lankan",
         "iso3": "lka",
         "iso2": "lk",
         "phone_code": "94",
         "locale_code": [
              "si-LK"
         ]
    },
    {
         "id": 165,
         "name": "Sudan",
         "nationality": "Sudanese",
         "iso3": "sdn",
         "iso2": "sd",
         "locale_code": [
              ""
         ],
         "phone_code": "249"
    },
    {
         "id": 166,
         "name": "Suriname",
         "nationality": "Surinamer",
         "iso3": "sur",
         "iso2": "sr",
         "locale_code": [
              ""
         ],
         "phone_code": "597"
    },
    {
         "id": 167,
         "name": "Swaziland",
         "nationality": "Swazi",
         "iso3": "swz",
         "iso2": "sz",
         "locale_code": [
              ""
         ],
         "phone_code": "268"
    },
    {
         "id": 168,
         "name": "Sweden",
         "nationality": "Swedish",
         "iso3": "swe",
         "iso2": "se",
         "phone_code": "46",
         "locale_code": [
              "sv-SE"
         ]
    },
    {
         "id": 169,
         "name": "Switzerland",
         "nationality": "Swiss",
         "iso3": "che",
         "iso2": "ch",
         "phone_code": "41",
         "locale_code": [
              "de-CH"
         ]
    },
    {
         "id": 170,
         "name": "Syria",
         "nationality": "Syrian",
         "iso3": "syr",
         "iso2": "sy",
         "phone_code": "963",
         "locale_code": [
              "ar-SY"
         ]
    },
    {
         "id": 171,
         "name": "Taiwan",
         "nationality": "Taiwanese",
         "iso3": "twn",
         "iso2": "tw",
         "phone_code": "886",
         "locale_code": [
              "zh-TW"
         ]
    },
    {
         "id": 172,
         "name": "Tajikistan",
         "nationality": "Tajik",
         "iso3": "tjk",
         "iso2": "tj",
         "locale_code": [
              ""
         ],
         "phone_code": "992"
    },
    {
         "id": 173,
         "name": "Tanzania",
         "nationality": "Tanzanian",
         "iso3": "tza",
         "iso2": "tz",
         "phone_code": "255",
         "locale_code": [
              "en-TZ"
         ]
    },
    {
         "id": 174,
         "name": "Thailand",
         "nationality": "Thai",
         "iso3": "tha",
         "iso2": "th",
         "phone_code": "66",
         "locale_code": [
              "th-TH"
         ]
    },
    {
         "id": 175,
         "name": "Togo",
         "nationality": "Togolese",
         "iso3": "tgo",
         "iso2": "tg",
         "locale_code": [
              ""
         ],
         "phone_code": "228"
    },
    {
         "id": 176,
         "name": "Tonga",
         "nationality": "Tongan",
         "iso3": "ton",
         "iso2": "to",
         "locale_code": [
              ""
         ],
         "phone_code": "676"
    },
    {
         "id": 177,
         "name": "Trinidad and Tobago",
         "nationality": "Trinidadian or Tobagonian",
         "iso3": "tto",
         "iso2": "tt",
         "locale_code": [
              ""
         ],
         "phone_code": "1-868"
    },
    {
         "id": 178,
         "name": "Tunisia",
         "nationality": "Tunisian",
         "iso3": "tun",
         "iso2": "tn",
         "phone_code": "216",
         "locale_code": [
              "ar-TN"
         ]
    },
    {
         "id": 179,
         "name": "Turkey",
         "nationality": "Turkish",
         "iso3": "tur",
         "iso2": "tr",
         "phone_code": "90",
         "locale_code": [
              "tr-TR"
         ]
    },
    {
         "id": 180,
         "name": "Turkmenistan",
         "nationality": "Turkmen",
         "iso3": "tkm",
         "iso2": "tm",
         "locale_code": [
              ""
         ],
         "phone_code": "993"
    },
    {
         "id": 181,
         "name": "Tuvalu",
         "nationality": "Tuvaluan",
         "iso3": "tuv",
         "iso2": "tv",
         "locale_code": [
              ""
         ],
         "phone_code": "688"
    },
    {
         "id": 182,
         "name": "Uganda",
         "nationality": "Ugandan",
         "iso3": "uga",
         "iso2": "ug",
         "phone_code": "256",
         "locale_code": [
              "en-UG"
         ]
    },
    {
         "id": 183,
         "name": "Ukraine",
         "nationality": "Ukrainian",
         "iso3": "ukr",
         "iso2": "ua",
         "locale_code": [
              "uk-UA"
         ],
         "phone_code": "380"
    },
    {
         "id": 184,
         "name": "United Arab Emirates",
         "nationality": "Emirian",
         "iso3": "are",
         "iso2": "ae",
         "phone_code": "971",
         "locale_code": [
              "ar-AE"
         ]
    },
    {
         "id": 185,
         "name": "United Kingdom",
         "nationality": "British",
         "iso3": "gbr",
         "iso2": "gb",
         "phone_code": "44",
         "locale_code": [
              "en-GB"
         ]
    },
    {
         "id": 186,
         "name": "United States",
         "nationality": "American",
         "iso3": "usa",
         "iso2": "us",
         "locale_code": [
              "en-US"
         ],
         "phone_code": "1"
    },
    {
         "id": 187,
         "name": "Uruguay",
         "nationality": "Uruguayan",
         "iso3": "ury",
         "iso2": "uy",
         "phone_code": "598",
         "locale_code": [
              "es-UY"
         ]
    },
    {
         "id": 188,
         "name": "Uzbekistan",
         "nationality": "Uzbekistani",
         "iso3": "uzb",
         "iso2": "uz",
         "phone_code": "998",
         "locale_code": [
              "uz-UZ"
         ]
    },
    {
         "id": 189,
         "name": "Vanuatu",
         "locale_code": [
              ""
         ],
         "nationality": "ni-Vanuatu",
         "iso3": "vut",
         "iso2": "vu",
         "phone_code": "678"
    },
    {
         "id": 190,
         "name": "Venezuela",
         "nationality": "Venezuelan",
         "iso3": "ven",
         "iso2": "ve",
         "locale_code": [
              ""
         ],
         "phone_code": "58"
    },
    {
         "id": 191,
         "name": "Vietnam",
         "nationality": "Vietnamese",
         "iso3": "vnm",
         "iso2": "vn",
         "phone_code": "84",
         "locale_code": [
              "vi-VN"
         ]
    },
    {
         "id": 192,
         "name": "Yemen",
         "nationality": "Yemenite",
         "iso3": "yem",
         "locale_code": [
              ""
         ],
         "iso2": "ye",
         "phone_code": "967"
    },
    {
         "id": 193,
         "name": "Zambia",
         "nationality": "Zambian",
         "iso3": "zmb",
         "iso2": "zm",
         "phone_code": "260",
         "locale_code": [
              "en-ZM"
         ]
    },
    {
         "id": 194,
         "name": "Zimbabwe",
         "nationality": "Zimbabwean",
         "iso3": "zwe",
         "iso2": "zw",
         "phone_code": "263",
         "locale_code": [
              "en-ZW"
         ]
    }
]

}
