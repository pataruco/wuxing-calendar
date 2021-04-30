//********************************************************************************************************
//********************************************************************************************************
//                                                                                                      //
//                                ASTROJS Versione Release3.022                                         //
//                                *****************************                                         //
//                                                                                                      //
//                             Copyright by  SALVATORE RUIU (Italy)                                     //
//                                    http://www.suchelu.it                                             //
//                                  email: salruiu2008@gmail.com                                        //
//                                                                                                      //
//********************************************************************************************************
//********************************************************************************************************
//                           Ultima modifica: 03-aprile-2015 - LAST UPDATED.                            //
//********************************************************************************************************
//********************************************************************************************************

function start() {
  alert(
    'AstroJS Is Ready!  Release 3.022 by Salvatore Ruiu ( www.suchelu.it )',
  );
}

//                FUNZIONE PER IL RECUPERO DEL FUSO ORARIO DELLA LOCALITA' - INIZIO

function fuso_loc() {
  // recupera il fuso orario e restituisce un valore in ore.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) giugno 2010.
  // per longitudini a est di GREENWICH il valore del fuso è negativo, positivo per quelle a ovest.

  var data = new Date();
  var fuso_lc = data.getTimezoneOffset() / 60;

  return fuso_lc;
}

//                FUNZIONE PER IL RECUPERO DEL FUSO ORARIO DELLA LOCALITA' - FINE

//********************************************************************************************************

//                VERIFICA L'ORA LEGALE PER UNA DATA  - INIZIO

function hh_loc(fuso, njd) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2011.
  // verifica se per la data (njd) è in vigore l'ora legale.
  // fuso = fuso orario della località.
  // restituisce le ore da aggiungere al T.U. per avere il Tempo Locale ( fuso + ora_legale ).

  var njd1 = 0; // variabile per l'ultima domenica di marzo.
  var njd2 = 0; // variabile per l'ultima domenica di ottobre.
  var tempo_locale = fuso; // tempo locale.

  var anno = jd_data(njd); // individua l'anno della data (njd).

  var njd_m = calcola_jddata(1, 3, anno[2], 0, 0, 0) - 1; // G.G. del primo marzo.
  var njd_o = calcola_jddata(1, 10, anno[2], 0, 0, 0) - 1; // G.G. del primo ottobre.

  for (a = 1; a < 32; a++) {
    njd_m = njd_m + 1;
    giorno = jd_data(njd_m);
    if (giorno[5] == 0) {
      njd1 = njd_m;
    } // ultima domenica di marzo.

    njd_o = njd_o + 1;
    giorno = jd_data(njd_o);
    if (giorno[5] == 0) {
      njd2 = njd_o;
    } // ultima domenica di ottobre.
  }

  if (njd >= njd1 && njd < njd2) {
    tempo_locale = tempo_locale + 1;
  }

  return tempo_locale;
}

//                VERIFICA L'ORA LEGALE PER UNA DATA  - FINE

//********************************************************************************************************

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER IL CALCOLO DELLA DATA  - INIZIO

function calcola_data(lingua) {
  // parametri lingua= "ITA" - "ING" - "FRA" - "TED" - "SAR" - "SPA" - "POR" - "ESP"
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009.
  // utilizzo caratteri speciali ANSI.
  // restituisce la stringa DataIns.

  var DataIns = '.';
  var it_giorni = new Array(
    'Domenica',
    'Luned&#236',
    'Marted&#236',
    'Mercoled&#236',
    'Gioved&#236',
    'Venerd&#236',
    'Sabato',
  );
  var it_mesi = new Array(
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  );

  var en_giorni = new Array(
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  );
  var en_mesi = new Array(
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  );

  var fr_giorni = new Array(
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  );
  var fr_mesi = new Array(
    'Janvier',
    'F&#233vrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Ao&#251t',
    'Septembre',
    'Octobre',
    'Novembre',
    'D&#233cembre',
  );

  var te_giorni = new Array(
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
  );
  var te_mesi = new Array(
    'Januar',
    'Februar',
    'M&#228rz',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  );

  var sr_giorni = new Array(
    'Dom&#236niga',
    'Lunis',
    'Martis',
    'M&#232;rcuris',
    'Gi&#242;bia',
    'Chen&#224;bura',
    'S&#224;badu',
  );
  var sr_mesi = new Array(
    'Ghenn&#224rgiu',
    'Fre&#224rgiu',
    'Martzu',
    'Abrile',
    'Maju',
    'L&#224mpadas',
    'Tr&#236ulas',
    'Austu',
    'Cabudanni',
    'Santugaine',
    'Santandria',
    'Nadale',
  );

  var sp_giorni = new Array(
    'Domingo',
    'Lunes',
    'Martes',
    'Mi&#233;rcoles',
    'Jueves',
    'Viernes',
    'S&#225;bado',
  );
  var sp_mesi = new Array(
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  );

  var pr_giorni = new Array(
    'Domingo',
    'Segunda-feira',
    'Ter&#231;a-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'S&#225;bado',
  );
  var pr_mesi = new Array(
    'Janeiro',
    'Fevereiro',
    'Mar&#231;o',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  );

  var es_giorni = new Array(
    'Dimanco',
    'Lundo',
    'Mardo',
    'Merkredo',
    'Ja&#249;do',
    'Vendredo',
    'Sabato',
  );
  var es_mesi = new Array(
    'Januaro',
    'Februaro',
    'Marto',
    'Aprilo',
    'Majo',
    'Junio',
    'Julio',
    'A&#249;gusto',
    'Septembro',
    'Oktobro',
    'Novembro',
    'Decembro',
  );

  var data = new Date();

  var anno = data.getYear(); // anno
  var mese = data.getMonth(); // mese 0 a 11
  var giorno = data.getDate(); // numero del giorno da 1 a 31
  var giorno_settimana = data.getDay(); // giorno della settimana 0 a 6
  var ora = data.getHours(); // ora del giorno da 0 a 23
  var minuti = data.getMinutes(); // minuti da 0 a 59
  var secondi = data.getSeconds(); // secondi da 0 a 59

  if (anno < 1900) {
    anno = anno + 1900;
  } // correzione anno

  if (ora < 10) {
    ora = '0' + ora;
  }

  if (minuti < 10) {
    minuti = '0' + minuti;
  }

  if (secondi < 10) {
    secondi = '0' + secondi;
  }

  if (lingua == 'ING') {
    DataIns =
      ora +
      ':' +
      minuti +
      ':' +
      secondi +
      '   ' +
      en_giorni[giorno_settimana] +
      ', ' +
      giorno +
      ' ' +
      en_mesi[mese] +
      ' ' +
      anno;
  } else if (lingua == 'FRA') {
    DataIns =
      ora +
      ':' +
      minuti +
      ':' +
      secondi +
      '   ' +
      fr_giorni[giorno_settimana] +
      ', ' +
      giorno +
      ' ' +
      fr_mesi[mese] +
      ' ' +
      anno;
  } else if (lingua == 'TED') {
    DataIns =
      ora +
      ':' +
      minuti +
      ':' +
      secondi +
      '   ' +
      te_giorni[giorno_settimana] +
      ', ' +
      giorno +
      ' ' +
      te_mesi[mese] +
      ' ' +
      anno;
  } else if (lingua == 'SAR') {
    DataIns =
      ora +
      ':' +
      minuti +
      ':' +
      secondi +
      '   ' +
      sr_giorni[giorno_settimana] +
      ', ' +
      giorno +
      ' ' +
      sr_mesi[mese] +
      ' ' +
      anno;
  } else if (lingua == 'SPA') {
    DataIns =
      ora +
      ':' +
      minuti +
      ':' +
      secondi +
      '   ' +
      sp_giorni[giorno_settimana] +
      ', ' +
      giorno +
      ' ' +
      sp_mesi[mese] +
      ' ' +
      anno;
  } else if (lingua == 'POR') {
    DataIns =
      ora +
      ':' +
      minuti +
      ':' +
      secondi +
      '   ' +
      pr_giorni[giorno_settimana] +
      ', ' +
      giorno +
      ' ' +
      pr_mesi[mese] +
      ' ' +
      anno;
  } else if (lingua == 'ESP') {
    DataIns =
      ora +
      ':' +
      minuti +
      ':' +
      secondi +
      '   ' +
      es_giorni[giorno_settimana] +
      ', ' +
      giorno +
      ' ' +
      es_mesi[mese] +
      ' ' +
      anno;
  } else {
    DataIns =
      ora +
      ':' +
      minuti +
      ':' +
      secondi +
      '   ' +
      it_giorni[giorno_settimana] +
      ', ' +
      giorno +
      ' ' +
      it_mesi[mese] +
      ' ' +
      anno;
  }

  return DataIns;
}

//               FUNZIONE PER IL CALCOLO DELLA DATA  - FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER IL CALCOLO DELLA DATA CON LA FORMATTAZIONE IN NUMERI  - INIZIO

function calcola_datan(lingua) {
  // parametri lingua= "ITA" - "ING"
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009.
  // utilizzo caratteri speciali ANSI.
  // restituisce la stringa DataIns.
  // utilizzata solo per il datario delle fasi lunari
  // per la data completa utilizzare [calcola_datan2(lingua)]

  var DataInsn = '.';

  var data = new Date();

  var anno = data.getYear(); // anno
  var mese = data.getMonth(); // mese 0 a 11
  var giorno = data.getDate(); // numero del giorno da 1 a 31
  var giorno_settimana = data.getDay(); // giorno della settimana 0 a 6
  var ora = data.getHours(); // ora del giorno da 0 a 23
  var minuti = data.getMinutes(); // minuti da 0 a 59
  var secondi = data.getSeconds(); // secondi da 0 a 59

  if (anno < 1900) {
    anno = anno + 1900;
  } // correzione anno

  if (ora < 10) {
    ora = '0' + ora;
  }

  if (minuti < 10) {
    minuti = '0' + minuti;
  }

  if (secondi < 10) {
    secondi = '0' + secondi;
  }

  mese = mese + 1;

  if (lingua == 'ING') {
    DataInsn = mese + ':' + giorno + ':' + anno + ':' + ora;
  } else {
    DataInsn = giorno + ':' + mese + ':' + anno + ':' + ora;
  }

  return DataInsn;
}

//               FUNZIONE PER IL CALCOLO DELLA DATA CON LA FORMATTAZIONE IN NUMERI - FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
//
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER IL CALCOLO DELLA DATA CON LA FORMATTAZIONE IN NUMERI  - INIZIO

function calcola_datan2(lingua) {
  // parametri lingua= "ITA" - "ING"
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009.
  // utilizzo caratteri speciali ANSI.
  // restituisce la stringa DataIns.

  var DataInsn = '.';

  var data = new Date();

  var anno = data.getYear(); // anno
  var mese = data.getMonth(); // mese 0 a 11
  var giorno = data.getDate(); // numero del giorno da 1 a 31
  var giorno_settimana = data.getDay(); // giorno della settimana 0 a 6
  var ora = data.getHours(); // ora del giorno da 0 a 23
  var minuti = data.getMinutes(); // minuti da 0 a 59
  var secondi = data.getSeconds(); // secondi da 0 a 59

  if (anno < 1900) {
    anno = anno + 1900;
  } // correzione anno

  if (ora < 10) {
    ora = '0' + ora;
  }

  if (minuti < 10) {
    minuti = '0' + minuti;
  }

  if (secondi < 10) {
    secondi = '0' + secondi;
  }

  mese = mese + 1;

  if (lingua == 'ING') {
    DataInsn =
      mese +
      ':' +
      giorno +
      ':' +
      anno +
      ':' +
      ora +
      ':' +
      minuti +
      ':' +
      secondi;
  } else {
    DataInsn =
      giorno +
      ':' +
      mese +
      ':' +
      anno +
      ':' +
      ora +
      ':' +
      minuti +
      ':' +
      secondi;
  }

  return DataInsn;
}

//               FUNZIONE PER IL CALCOLO DELLA DATA CON LA FORMATTAZIONE IN NUMERI - FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//              FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO  -  INIZIO

function calcola_jd() {
  // funzione per il calcolo del giorno giuliano utilizzando la data indicata dal pc.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) giugno 2010.
  // restituisce il valore numerico dataGiuliana_dec.
  // il giorno giuliano è calcolato per il T.U. di Greenwich.
  // la funzione [fuso_loc()], recupera il fuso orario della località (-est) (+ovest).
  // la funzione ritorna la variabile numerica dataGiuliana_dec;

  var data = new Date();

  var anno = data.getYear(); // anno
  var mese = data.getMonth(); // mese 0 a 11
  var giorno = data.getDate(); // numero del giorno da 1 a 31
  var ora = data.getHours(); // ora del giorno da 0 a 23 recuperata dal pc.
  var minuti = data.getMinutes(); // minuti da 0 a 59
  var secondi = data.getSeconds(); // secondi da 0 a 59

  mese = mese + 1;

  if (anno < 1900) {
    anno = anno + 1900;
  } // correzione anno per il browser.

  ora = ora + fuso_loc(); // recupera il fuso orario della località (compresa l'ora legale) e riporta l'ora del pc. come T.U.

  var dataGiuliana = costanti_jd(giorno, mese, anno, ora, minuti, secondi);

  dataGiuliana = dataGiuliana * 1; // definire come valore numerico.

  return dataGiuliana; // restituisce il giorno giuliano
}

//*************************** COSTANTI PER IL CALCOLO DEL GIORNO GIULIANO

// ---------- costanti di calcolo per il giorno giuliano - inizio

function costanti_jd(giorno, mese, anno, ora, minuti, secondi) {
  var yy_negativo = 0; // sottrae 1 quando l'anno è negativo.
  var mese_str = String(mese); // il mese in formato stringa.

  if (anno < 0) {
    yy_negativo = 1;
  } // verifica l'anno negativo.

  if (mese == 1 || mese == 2) {
    mese_str = '0' + mese_str;
    anno = anno - 1;
    mese = mese + 12;
  } // verifica il mese e l'anno.

  var verifica_yy = String(anno) + '.' + mese_str + String(giorno); // verifica l'anno formato stringa.
  var yy_num = eval(verifica_yy); // riporta l'anno in formato numerico.

  var a = parseInt(anno / 100);
  var b = 2 - a + parseInt(a / 4);

  if (yy_num < 1582.1015) {
    a = 0;
    b = 0;
  } // azzera le variabili a e b quando l'anno è minore di 1582.1015.

  var c = parseInt(365.25 * anno);
  var d = parseInt(30.6001 * (mese + 1));

  var dataGiuliana = b + c + d + giorno + 1720994.5 - yy_negativo;

  var offsetGiornata = (3600 * ora + 60 * minuti + secondi) / 86400;

  dataGiuliana = dataGiuliana + offsetGiornata;

  dataGiuliana = dataGiuliana.toFixed(6);

  return dataGiuliana;
}

// -- costanti di calcolo per il giorno giuliano - fine

//              FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO  -  FINE

//              FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO ALL'ORA 0 DI OGGI   -  INIZIO

function calcola_jdUT0() {
  // funzione per il calcolo del giorno giuliano per l'ora 0 di oggi in T.U.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) giugno 2010.
  // restituisce il valore numerico dataGiuliana.

  var data = new Date();

  var anno = data.getYear(); // anno
  var mese = data.getMonth(); // mese 0 a 11
  var giorno = data.getDate(); // numero del giorno da 1 a 31
  var ora = 0; // ora del giorno da 0 a 23 in T.U.
  var minuti = 0; // minuti da 0 a 59
  var secondi = 0; // secondi da 0 a 59

  mese = mese + 1;

  if (anno < 1900) {
    anno = anno + 1900;
  } // correzione anno per il browser.

  var dataGiuliana = costanti_jd(giorno, mese, anno, ora, minuti, secondi);

  dataGiuliana = dataGiuliana * 1; // definire come valore numerico.

  return dataGiuliana; // restituisce il giorno giuliano
}

//              FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO ALL'ORA 0 DI OGGI   -  INIZIO

function calcola_dd_mese(mese, anno) {
  // calcola il numero dei giorni del mese indicato.

  var njd = calcola_jddata(1, mese, anno, 0, 0, 0);
  var a = 0;

  for (a = 1; a < 31; a++) {
    data = jd_data(njd + a);

    if (mese != data[1]) {
      break;
    }
  }

  return a;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//              FUNZIONE PER IL CALCOLO DELLA DATA DAL NUMERO DEL GIORNO GIULIANO                                         -  INIZIO

export function jd_data(njd) {
  // funzione per il calcolo della data dal numero del giorno giuliano.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) novembre 2011.
  // restituisce i valori numerici gg/mm/yy.
  // il valore gg è in giorni e ore decimali. Moltiplicare la parte decimale di qq. x24.per avere le ore.
  // njd=numero del giorno giuliano.

  var I = parseInt(njd + 0.5);
  var F = njd + 0.5 - I;
  var A = 0;
  var B = 0;

  if (I >= 2229160) {
    A = parseInt((I - 1867216.25) / 36524.25);
    B = I + 1 + A - parseInt(A / 4);
  } else {
    B = I;
  }

  var C = B + 1524;
  var D = parseInt((C - 122.1) / 365.25);
  var E = parseInt(365.25 * D);
  var G = parseInt((C - E) / 30.6001);

  // recupero del giorno.

  var giorno = C - E + F - parseInt(30.6001 * G); // giorno con ore decimali.
  giorno = giorno; // toFixed(6)

  // recupero del mese.

  var mese = 0;

  if (G < 13.5) {
    mese = G - 1;
  } else if (G > 13.5) {
    mese = G - 13;
  }

  // recupero dell'anno.

  var anno = 0;

  if (mese > 2.5) {
    anno = D - 4716;
  } else if (mese < 2.5) {
    anno = D - 4715;
  }

  njd = jdHO(njd); // riporta il giorno giuliano (njd), alle ore 0(zero) del giorno.

  var gio_sett = (njd + 1.5) % 7; // recupera il resto: calcola il numero del giorno della settimana (0=domenica, 1=lunedì....)
  var gio_sett_n = gio_sett; // giorno della settimana numerico.

  var gio_sett_en = ''; // giorno della settimana in inglese.

  if (gio_sett == 0) {
    gio_sett = 'Do';
    gio_sett_en = 'Su';
  } else if (gio_sett == 1) {
    gio_sett = 'Lu';
    gio_sett_en = 'Mo';
  } else if (gio_sett == 2) {
    gio_sett = 'Ma';
    gio_sett_en = 'Tu';
  } else if (gio_sett == 3) {
    gio_sett = 'Me';
    gio_sett_en = 'We';
  } else if (gio_sett == 4) {
    gio_sett = 'Gi';
    gio_sett_en = 'Th';
  } else if (gio_sett == 5) {
    gio_sett = 'Ve';
    gio_sett_en = 'Fr';
  } else if (gio_sett == 6) {
    gio_sett = 'Sa';
    gio_sett_en = 'Sa';
  }

  var data_calendario = new Array(
    giorno,
    mese,
    anno,
    gio_sett,
    gio_sett_en,
    gio_sett_n,
  );
  // array   0     1     2     3          4           5

  return data_calendario;
}

//              FUNZIONE PER IL CALCOLO DELLA DATA DAL NUMERO DEL GIORNO GIULIANO                                         -  FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//              FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO PER LO 0.0 GENNAIO DELL' ANNO CORRENTE -    INIZIO

function calcola_jda() {
  // funzione per il calcolo del giorno giuliano per il 0.0 gennaio dell'anno corrente.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009
  // restituisce dataGiuliana, giorno giuliano inizio anno.
  // recupera automaticamente l'anno.
  // il giorno giuliano è calcolato per il tempo 0 T.U. di Greenwich.

  var data = new Date();

  var anno = data.getYear(); // anno
  var mese = 1; // mese
  var giorno = 0.0; // giorno=0.0

  if (anno < 1900) {
    anno = anno + 1900;
  } // correzione anno per il browser.

  var dataGiuliana = costanti_jd(giorno, mese, anno, 0, 0, 0); // valore del giorno giuliano per lo 0.0 gennaio dell'anno corrente.

  dataGiuliana = dataGiuliana * 1; // definire come valore numerico.
  //
  return dataGiuliana;
}

//                             FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO PER LO 0.0 GENNAIO DELL'ANNO CORRENTE -    FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//              FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO PER LO 0.0 GENNAIO DELL' ANNO SPECIFICATO NEL PARAMETRO      -    INIZIO

function calcola_jd_anno(anno) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009
  // funzione uguale alla precedente ma il calcolo viene effettuato per lo 0.0 gennaio dell'anno indicato dal parametro (anno).

  var mese = 1; // mese = 1
  var giorno = 0.0; // numero del giorno 0.0

  var dataGiuliana = costanti_jd(giorno, mese, anno, 0, 0, 0); // valore del giorno giuliano per lo 0.0 gennaio dell'anno specificato.

  dataGiuliana = dataGiuliana * 1; // definire come valore numerico.

  return dataGiuliana;
}

//              FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO PER LO 0.0 GENNAIO DELL' ANNO SPECIFICATO NEL PARAMETRO        -    FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//                             FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO PER UNA DATA QUALSIASI -    INIZIO

function calcola_jddata(giorno, mese, anno, ora, minuti, secondi) {
  // funzione per il calcolo del giorno giuliano per una data qualsiasi.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009
  // restituisce il valore numerico dataGiuliana_annox
  //  ATTENZIONE! inserire i valori dei tempi come T.U. di GREENWICH

  var dataGiuliana = costanti_jd(giorno, mese, anno, ora, minuti, secondi); // valore del giorno giuliano per una data qualsiasi.

  dataGiuliana = dataGiuliana * 1; // definire come valore numerico.

  return dataGiuliana;
}

//                             FUNZIONE PER IL CALCOLO DEL GIORNO GIULIANO PER UNA DATA QUALSIASI -   FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

function jdHO(njd) {
  // funzione che riporta il giorno giuliano (njd) al giorno giuliano delle ore H: 0(zero) dello stesso giorno.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) agg: giugno 2013.

  var njd_dec = njd - parseInt(njd); // recupera la parte decimale del giorno giuliano.

  njd = njd_dec < 0.5 ? parseInt(njd) - 0.5 : parseInt(njd) + 0.5; // operatore ternario.

  return njd; // restituisce il g.giuliano per le h:0 dello stesso giorno.
}

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER IL CALCOLO DEL TEMPO SIDERALE DI GREENWICH                  -  INIZIO

function temposid(njd) {
  // funzione per il calcolo del tempo siderale di GREENWICH.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy). 10 2011.
  // PARAMETRO njd    ---  numero dei giorni giuliani della data corrente riferita al T.U. di Greenwich.
  // fuso= fuso orario della località è già considerato nel calcolo del giorno giuliano.
  // restituisce il valore numerico SIDERAL_TIMEG in ore decimali

  //var time_zg=parseInt(njd)+0.5;                            // giorno giuliano all'ora zero di Greenwich.
  var time_zg = jdHO(njd);
  var T = (time_zg - 2415020.0) / 36525;
  //  data di riferimento :2415020 = 0.0:1900
  var int_time = 0.276919398 + 100.0021359 * T + 0.000001075 * T * T; //  numero rivoluzioni; utilizzare la parte decimale del valore int_time.

  int_time = (int_time - parseInt(int_time)) * 24; // tempo siderale a Greenwich alle ore zero UT

  var TSG = int_time; // tempo siderale a Greenwich alle ore zero UT.

  // TEMPO SIDERALE PER QUALUNQUE INTERVALLO DI ORE A GREENWICH

  var time_qi = (njd - time_zg) * 24; // qualunque intervallo per Greenwich.
  var intervallo_ts = time_qi * 1.002737908;

  var SIDERAL_TIMEG = TSG + intervallo_ts; // TEMPO SIDERALE PER QUALSIASI INTERVALLO (ore decimali).

  SIDERAL_TIMEG = ore_24(SIDERAL_TIMEG); // intervallo 0-24 (ore decimali).

  return SIDERAL_TIMEG;
}

//               FUNZIONE PER IL CALCOLO DEL TEMPO SIDERALE DI GREENWICH                  -  FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER IL CALCOLO DEL TEMPO SIDERALE APPARENTE DI GREENWICH                                         -  INIZIO

function temposid_app(njd) {
  // funzione per il calcolo del tempo siderale apparente di GREENWICH.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy). 1 2012.
  // PARAMETRO njd    ---  numero dei giorni giuliani della data corrente riferita al T.U. di Greenwich.
  // fuso= fuso orario della località è già considerato nel calcolo del giorno giuliano.
  // restituisce il valore numerico TSG_app in ore decimali

  var TSG = temposid(njd); // tempo siderale a Greenwich.

  // CALCOLA IL TEMPO SIDERALE APPARENTE.

  var delta_fi = nutazione(njd); // nutazione in ascensione retta.
  var ecl = obli_ecli(njd); // calcola l'obliquità dell'eclittica.
  // correzione in secondi.
  var correzione = (delta_fi[0] * Math.cos(Rad(ecl))) / 15;
  correzione = correzione / 3600;

  var TSG_app = TSG + correzione; // tempo siderale apparente di Greenwich.
  TSG_app = ore_24(TSG_app); // intervallo 0-24 (ore decimali).

  return TSG_app;
}

//               FUNZIONE PER IL CALCOLO DEL TEMPO SIDERALE APPARENTE DI GREENWICH                                           -  FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER IL CALCOLO DEL TEMPO SIDERALE LOCALE                        -  INIZIO

function TSL(TSG, Long) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy). dicembre 2009
  // Calcola il tempo siderale locale.
  // Long: longitudine negativa W, positiva per E.
  // TSG: Tempo siderale a Greenwich in ore decimali.
  // restituisce il valore numerico TSLOCALE in ore decimali.

  var TSLOCALE = TSG + Long / 15;

  TSLOCALE = ore_24(TSLOCALE); // intervallo 0-24.

  return TSLOCALE;
}

//               FUNZIONE PER IL CALCOLO DEL TEMPO SIDERALE LOCALE                        -  FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER LA TRASFORMAZIONE DEL TSG IN TMG PER LA DATA CORRENTE                                       -  INIZIO

function tras_tsg_tmg(TSG_DEC) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy). dicembre 2009
  // TSG_DEC: Tempo siderale a Greenwich in ore decimali.
  // restituisce il valore numerico TMG in ore decimali.
  // calcolo effettuato per la data corrente.

  var data = new Date();
  var anno = data.getYear(); // anno.

  if (anno < 1900) {
    anno = anno + 1900;
  } // correzione anno per il browser.

  var valore_jda = calcola_jda(); // giorno giuliano 0.0 gennaio anno corrente.

  //  calcolare il valore di B

  var S = valore_jda - 2415020;
  var T = S / 36525;
  var R = 6.6460656 + 2400.051262 * T + 0.00002581 * T * T;
  var U = R - 24 * (anno - 1900);
  var B = 24 - U;

  B = ore_24(B); // riporta l'intervallo di B tra 0-24 ore.

  //      valore di B

  var valore_jd = calcola_jd(); // valore del giorno giuliano per la data corrente U.T. GREENWICH.
  var num_day = Math.floor(valore_jd - valore_jda);

  var TO = num_day * 0.0657098 - B;

  TO = ore_24(TO); // intervallo 0-24 ore.

  var TMG = TSG_DEC - TO; // valore del tempo medio a Greenwich

  TMG = ore_24(TMG); // intervallo 0-24 ore.

  TMG = TMG * 0.99727;

  return TMG;
}

//               FUNZIONE PER LA TRASFORMAZIONE DEL TSG IN TMG PER LA DATA CORRENTE                                          -  FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER LA TRASFORMAZIONE DEL TSG IN TMG PER LA DATA INDICATA NEL PARAMETRO                          -  INIZIO

function tsg_tmg_data(TSG_DEC, anno, njd) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy). dicembre 2009
  // TSG_DEC: Tempo siderale a Greenwich in ore decimali.
  // restituisce il valore numerico TMG in ore decimali.
  // calcolo effettuato per la data indicata nel parametro njd.
  //  njd non sono necessarie le ore
  //  funzione da utilizzare nelle effemeridi.

  var valore_jda = calcola_jd_anno(anno); // giorno giuliano 0.0 gennaio dell'anno indicato.

  //  calcolare il valore di B

  var S = valore_jda - 2415020; // 0.0 gennaio 1900.
  var T = S / 36525;
  var R = 6.6460656 + 2400.051262 * T + 0.00002581 * T * T;
  var U = R - 24 * (anno - 1900);
  var B = 24 - U;

  B = ore_24(B); // intervallo 0-24 ore.

  //      valore di B

  var valore_jd = njd; // valore del giorno giuliano per la data indicata nel parametro.
  var num_day = Math.floor(valore_jd - valore_jda);

  var TO = num_day * 0.0657098 - B;
  TO = ore_24(TO) * 1; // intervallo 0-24 ore.

  var TMG = TSG_DEC - TO; // valore del tempo medio a Greenwich

  TMG = ore_24(TMG) * 1; // intervallo 0-24 ore.

  TMG = TMG * 0.99727;

  return TMG;
}

//               FUNZIONE PER LA TRASFORMAZIONE DEL TSG IN TMG PER LA DATA INDICATA NEL PARAMETRO                           -  FINE

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER LA FORMATTAZIONE DELLE ORE DECIMALI IN HH/MM/SS          - INIZIO

function sc_ore(ore_dec) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy).
  // scomposizione delle ore decimali [ore_dec], in  hh |mm |ss. - tronca i decimali dei secondi senza applicare arrotondamenti.
  // restituisce la variabile stringa [ore_hms].
  // ATTENZIONE! La funzione riporta le ore all'interno dell'intervallo: 0-24.
  // agg: Dicembre 2011

  var ored = ore_24(ore_dec); // Intervallo ore: 0-24

  var ore = parseInt(ored); //     Ore.
  var minuti = parseInt((ored - ore) * 60); //  Minuti.
  var secondi = parseInt(((ored - ore) * 60 - minuti) * 60); // Secondi.

  ore = String(ore); // trasforma il numero in stringa.
  minuti = String(minuti); // trasforma il numero in stringa.
  secondi = String(secondi); // trasforma il numero in stringa.

  //if (ore_dec<0){ore="-"+ore;}                         // recupera il segno meno.

  if (ore.length < 2) {
    ore = '0' + ore;
  }
  if (minuti.length < 2) {
    minuti = '0' + minuti;
  }
  if (secondi.length < 2) {
    secondi = '0' + secondi;
  }

  var ore_hms = ore + 'h. ' + minuti + 'm. ' + secondi + 's.';

  return ore_hms;
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------
//                           FUNZIONE PER LA FORMATTAZIONE DELLE ORE DECIMALI IN HH/MM/SS.decimali                        - INIZIO
// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

function sc_oresd(ore_dec) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy).
  // scomposizione delle ore decimali [ore_dec], in  hh |mm |ss.decimali con 2 decimali.
  // restituisce la variabile stringa [ore_hms].
  // ATTENZIONE! La funzione riporta le ore all'interno dell'intervallo: 0-24.
  // agg: Dicembre 2011

  var ored = ore_24(ore_dec); // Intervallo ore: 0-24

  var ore = parseInt(ored); //     Ore.
  var minuti = parseInt((ored - ore) * 60); //  Minuti.
  var secondi = (((ored - ore) * 60 - minuti) * 60).toFixed(2); // Secondi con 2 decimali.

  // verifica arrotondamenti.

  if (secondi >= 60) {
    secondi = secondi - 60;
    minuti = minuti + 1;
  }
  if (minuti >= 60) {
    minuti = minuti - 60;
    ore = ore + 1;
  }
  if (ore >= 24) {
    ore = ore_24(ore);
  } // Intervallo ore: 0-24

  ore = String(ore); //  trasforma il numero in stringa.
  minuti = String(minuti); //  trasforma il numero in stringa.
  secondi = String(secondi); //  trasforma il numero in stringa.

  if (ore.length < 2) {
    ore = '0' + ore;
  }
  if (minuti.length < 2) {
    minuti = '0' + minuti;
  }
  if (secondi.length <= 4) {
    secondi = '0' + secondi;
  }

  var ore_hms = ore + 'h. ' + minuti + 'm. ' + secondi + 's.';

  return ore_hms;
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

function sc_md(minuti_dec) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy).
  // scomposizione dei minuti decimali [minuti_dec], in  mm |ss.
  // restituisce la variabile stringa [min_ms].
  // agg: gennaio 2012

  var minuti_va = Math.abs(minuti_dec); //  valore assoluto del numero

  var minuti = parseInt(minuti_va); // Minuti.
  var secondi = ((minuti_va - minuti) * 60).toFixed(1); // Secondi con 2 decimali.

  // verifica arrotondamenti.

  if (secondi >= 60) {
    secondi = secondi - 60;
    minuti = minuti + 1;
  }

  minuti = String(minuti); //  trasforma il numero in stringa.
  secondi = String(secondi); //  trasforma il numero in stringa.

  if (minuti_dec < 0) {
    minuti = '-' + minuti;
  } // recupera il segno meno.

  if (minuti.length < 2) {
    minuti = '0' + minuti;
  }
  if (secondi.length < 3) {
    secondi = '0' + secondi;
  }

  var min_ms = minuti + 'm. ' + secondi + 's.';

  return min_ms;
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER LA FORMATTAZIONE DEGLI ANGOLI SESSADECIMALI IN: ° | ' |"                                          //

function sc_angolo(angolo_dec) {
  //   by Salvatore Ruiu Irgoli-Sardegna (Italy). settembre 2010
  //   scomposizione degli angoli decimali in  °|'|"
  //   [angolo_dec] in ore decimali.
  //   la funzione restituisce la variabile stringa [angolo_gms].

  var angolo = Math.abs(angolo_dec); // recupera il valore assoluto del numero

  var gradi = parseInt(angolo); //  Ore.
  var minuti = parseInt((angolo - gradi) * 60); //  Minuti.
  var secondi = parseInt(((angolo - gradi) * 60 - minuti) * 60); //  Secondi.

  //  trasforma il numero in stringa.

  var gradi_st = String(gradi);
  var minuti_st = String(minuti);
  var secondi_st = String(secondi);

  if (angolo_dec < 0) {
    gradi_st = '-' + gradi_st;
  } // recupera il segno meno.

  if (gradi_st.length < 2) {
    gradi_st = '0' + gradi_st;
  }
  if (minuti_st.length < 2) {
    minuti_st = '0' + minuti_st;
  }
  if (secondi_st.length < 2) {
    secondi_st = '0' + secondi_st;
  }

  var angolo_gms = gradi_st + '&ordm; ' + minuti_st + "' " + secondi_st + "''"; // modificato simbolo del grado. 10-2011

  return angolo_gms;
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER LA FORMATTAZIONE DEGLI ANGOLI SESSADECIMALI IN: ° | ' |"  con 2 decimali per i secondi            //

function sc_angolo_sd(angolo_dec) {
  //   by Salvatore Ruiu Irgoli-Sardegna (Italy). settembre 2010
  //   scomposizione degli angoli decimali in  °|'|"
  //   [angolo_dec] in ore decimali.
  //   la funzione restituisce la variabile stringa [angolo_gms].

  var angolo = Math.abs(angolo_dec); // recupera il valore assoluto del numero

  var gradi = parseInt(angolo); //  Ore.
  var minuti = parseInt((angolo - gradi) * 60); //  Minuti.
  var secondi = (((angolo - gradi) * 60 - minuti) * 60).toFixed(2); //  Secondi con 2 decimali.

  if (secondi >= 60) {
    secondi = secondi - 60;
    minuti = minuti + 1;
  }
  if (minuti >= 60) {
    minuti = minuti - 60;
    gradi = gradi + 1;
  }
  //if ( gradi>=360){   gradi= gradi-360;}

  //  trasforma il numero in stringa.

  var gradi_st = String(gradi);
  var minuti_st = String(minuti);
  var secondi_st = String(secondi);

  if (angolo_dec < 0) {
    gradi_st = '-' + gradi_st;
  } // recupera il segno meno.

  if (gradi_st.length < 2) {
    gradi_st = '0' + gradi_st;
  }
  if (minuti_st.length < 2) {
    minuti_st = '0' + minuti_st;
  }
  if (secondi_st.length <= 4) {
    secondi_st = '0' + secondi_st;
  }

  var angolo_gms = gradi_st + '&ordm; ' + minuti_st + "' " + secondi_st + "''"; // modificato simbolo del grado. 10-2011

  return angolo_gms;
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER LA FORMATTAZIONE DEI VALORI DECIMALI DEGLI ANGOLI

function sc_angolo_gm(angolo_dec, dec) {
  //   by Salvatore Ruiu Irgoli-Sardegna (Italy). settembre 2010
  //   scomposizione degli angoli decimali in  °|'
  //   [angolo_dec] in ore decimali.
  //   la funzione restituisce la variabile stringa [angolo_gms].

  var angolo = Math.abs(angolo_dec); // recupera il valore assoluto del numero

  var gradi = parseInt(angolo); //  Gradi.
  var minuti = ((angolo - gradi) * 60).toFixed(dec); //  Minuti.

  if (minuti >= 60) {
    minuti = minuti - 60;
    gradi = gradi + 1;
  }
  //if ( gradi>=360){   gradi= gradi-360;}

  //  trasforma il numero in stringa.

  var gradi_st = String(gradi);
  var minuti_st = String(minuti);

  if (angolo_dec < 0) {
    gradi_st = '-' + gradi_st;
  }

  if (gradi_st.length < 2) {
    gradi_st = '0' + gradi_st;
  }
  if (minuti_st.length <= 4 - dec) {
    minuti_st = '0' + minuti_st;
  }

  var angolo_gms = gradi_st + '&ordm; ' + minuti_st + "' ";

  return angolo_gms;
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

//               FUNZIONE PER LA FORMATTAZIONE DEI VALORI DECIMALI DEI GIORNI E DELLE ORE     - INIZIO

function sc_ore_hm(ore_dec) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy).
  // scomposizione delle ore decimali [ore_dec] in  ore|minuti. - tronca i decimali dei minuti senza applicare arrotondamenti.
  // La funzione restituisce la stringa [ore_hm].
  // ATTENZIONE!! La funzione riporta le ore all'interno dell'intervallo: 0-24.

  var ored = ore_24(ore_dec); // Intervallo ore: 0-24

  var ore = parseInt(ored); //     Ore.
  var minuti = parseInt((ored - ore) * 60); //  Minuti.

  ore = String(ore); //  trasforma il numero in stringa.
  minuti = String(minuti); //  trasforma il numero in stringa.

  if (ore.length < 2) {
    ore = '0' + ore;
  }
  if (minuti.length < 2) {
    minuti = '0' + minuti;
  }

  var ore_hm = ore + 'h. ' + minuti + 'm.';

  return ore_hm;
}

function sc_ore_hmd(ore_dec) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy).
  // scomposizione delle ore decimali [ore_dec], in  ore|minuti.decimali.
  // restituisce la variabile stringa [ore_hm].
  // ATTENZIONE!! La funzione riporta le ore all'interno dell'intervallo: 0-24.

  var ored = ore_24(ore_dec); // Intervallo ore: 0-24

  var ore = parseInt(ored); //     Ore.
  var minuti = ((ored - ore) * 60).toFixed(1); //  Minuti con 1 decimale.

  if (minuti >= 60) {
    minuti = minuti - 60;
    ore = ore + 1;
  }
  if (ore >= 24) {
    ore = ore_24(ore);
  } // Intervallo ore: 0-24

  ore = String(ore); // trasforma il numero in stringa.
  minuti = String(minuti); // trasforma il numero in stringa.

  if (ore.length < 2) {
    ore = '0' + ore;
  }
  if (minuti.length < 4) {
    minuti = '0' + minuti;
  }

  var ore_hm = ore + 'h. ' + minuti + 'm.';

  return ore_hm;
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

function sc_day(giorni_dec) {
  // Scomposizione dei giorni decimali in  giorni|ore|minuti|secondi.
  // tronca i decimali dei secondi senza applicare arrotondamenti.
  // [giorni_dec] - in giorni decimali.
  // la funzione restituisce la stringa [valore_dhms].
  // agg: Dicembre 2011.

  var dd_dec = Math.abs(giorni_dec); // recupera il valore assoluto.

  var dd = parseInt(dd_dec); //  giorni.
  var hh = parseInt((dd_dec - dd) * 24); //     ore.
  var mm = parseInt(((dd_dec - dd) * 24 - hh) * 60); //  minuti.
  var ss = parseInt((((dd_dec - dd) * 24 - hh) * 60 - mm) * 60); // secondi.

  dd = String(dd); // trasforma il numero in stringa.
  hh = String(hh);
  mm = String(mm);
  ss = String(ss);

  if (giorni_dec < 0) {
    dd = '-' + dd;
  } // recupera il segno meno.

  if (dd.length < 2) {
    dd = '0' + dd;
  }
  if (hh.length < 2) {
    hh = '0' + hh;
  }
  if (mm.length < 2) {
    mm = '0' + mm;
  }
  if (ss.length < 2) {
    ss = '0' + ss;
  }

  var valore_dhms = dd + 'd. ' + hh + 'h. ' + mm + 'm. ' + ss + 's.';

  return valore_dhms;
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

function sc_day_hm(giorni_dec) {
  // scomposizione dei giorni decimali in  giorni|ore|minuti.
  // tronca i decimali dei minuti senza applicare arrotondamenti.
  // [giorni_dec] - in giorni decimali.
  // la funzione restituisce la stringa [valore_dhms].
  // agg: Dicembre 2011.

  var dd_dec = Math.abs(giorni_dec); // recupera il valore assoluto.

  var dd = parseInt(dd_dec); //  giorni.
  var hh = parseInt((dd_dec - dd) * 24); //     ore.
  var mm = parseInt(((dd_dec - dd) * 24 - hh) * 60); //  minuti.

  dd = String(dd); //  trasforma il numero in stringa.
  hh = String(hh);
  mm = String(mm);

  if (giorni_dec < 0) {
    dd = '-' + dd;
  } //  recupera il segno meno.

  if (dd.length < 2) {
    dd = '0' + dd;
  }
  if (hh.length < 2) {
    hh = '0' + hh;
  }
  if (mm.length < 2) {
    mm = '0' + mm;
  }

  var valore_dhm = dd + 'd. ' + hh + 'h. ' + mm + 'm.';

  return valore_dhm;
}

// -------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------

function ore_24(hh) {
  // riporta le ore [hh] all'interno dell'intervallo 0-24.
  // Dicembre 2011.
  // restituisce un valore in ore decimali.

  if (hh >= 24) {
    while (hh >= 24) {
      hh = hh - 24;
    }
  } else if (hh < 0) {
    while (hh < 0) {
      hh = hh + 24;
    }
  }

  hh = hh.toPrecision(12);
  hh = hh * 1;

  return hh;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//      FUNZIONE PER IL CALCOLO DEL SORGERE E DEL TRAMONTARE DI UN ASTRO PER LA DATA INDICATA DAI PARAMETRI ANNO E NJD

function ST_ASTRO_DATA(njd, AR, DE, LONG, LAT, ALT, RAGGIO) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy). giugno 2013
  //  AR:   ascensione retta in ore decimali.
  //   DE:   declinazione in gradi sessadecimali.
  //    LON:  Longitudine in gradi sessadecimali (negativa a ovest di Greenwich).
  //     LAT:  Latitudine in gradi sessadecimali  (negativa per emisfero sud).
  //      ALT:  Altitudine in metri sul livello del mare.
  //    RAGGIO:  Raggio dell'astro=0.25 gradi da utilizzare solo per il sole e la luna.
  //       in tutti gli altri casi questo valore è sempre uguale a 0 zero.
  //        I tempi sono in T.U. di GREENWICH. per la data njd.
  //         Nel calcolo si tiene conto della rifrazione atmosferica (34') e dell'altitudine dell'osservatore (vedi funzione ST_ASTRO()).

  var _tempi_astro = ST_ASTRO(AR, DE, LONG, LAT, ALT, RAGGIO);

  // recupero degli azimut del sorgere e del tramontare [0,1]
  // recupero dei tempi siderali di Greenwich del sorgere, transito e tramonto dell'astro [5,6,7]

  var _Az_sorge = _tempi_astro[0] * 1;
  var _Az_tramonto = _tempi_astro[1] * 1;

  var _tsg_sorge = _tempi_astro[5] * 1;
  var _tsg_transita = _tempi_astro[6] * 1;
  var _tsg_tramonta = _tempi_astro[7] * 1;

  var _rec_anno = jd_data(njd); // anno della data giuliana njd.

  var _anno = _rec_anno[2] * 1; // anno della data giuliana njd.

  // trasformazione dei tempi siderali di Greenwich in tempi medi per la data (njd).

  var _tmg_sorge = tsg_tmg_data(_tsg_sorge, _anno, njd); // tempo medio a GREENWICH sorgere.
  var _tmg_transita = tsg_tmg_data(_tsg_transita, _anno, njd); // tempo medio a GREENWICH transito.
  var _tmg_tramonta = tsg_tmg_data(_tsg_tramonta, _anno, njd); // tempo medio a GREENWICH tramonto.

  var _H = _tempi_astro[8] * 1; // recupera l'angolo orario.

  var dati_astro = new Array(
    _Az_sorge,
    _Az_tramonto,
    _tmg_sorge,
    _tmg_transita,
    _tmg_tramonta,
    _H,
  ); //  restituisce le variabili numeriche.
  // posizione dati             0          1              2           3              4         5

  return dati_astro;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
//      FUNZIONE PER IL CALCOLO DEL SORGERE E DEL TRAMONTARE DI UN ASTRO PER LA DATA INDICATA NEL PARAMETRO NJD               - FINE
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

//      FUNZIONE PER IL CALCOLO DEL SORGERE E DEL TRAMONTARE DEL SOLE E DELLA LUNA - (metodo preciso )                      - INIZIO

function ST_SOLE_LUNA(
  njd,
  tempo_rif,
  astro,
  longitudine,
  latitudine,
  altitudine,
  raggio,
) {
  // metodo iterativo per calcolare il sorgere e il tramontare del sole e  della luna.
  //  by Salvatore Ruiu Irgoli-Sardegna (Italy). Giugno 2010.
  // il parametro astro assume i valori "L" e "S", rispettivamente luna e sole.
  // tempo_rif = "TL" tempo medio locale "TU" tempo universale.

  var tempo_rifst = 0; // tempo di riferimento per il sorgere e il tramonto.
  //
  if (tempo_rif == 'TL') {
    tempo_rifst = -fuso_loc();
  } // riferimento al tempo locale.
  else if (tempo_rif == 'TU') {
    tempo_rifst = 0;
  } // il riferimento rimane il TU

  // var njd=calcola_jdUT0();   // il numero del giorno giuliano di oggi alle ore 0(zero) del T.U.

  var p_astro = 0; // posizione del sole o della luna.
  var tempo_sorgere = 0; // tempo del sorgere.
  var tempo_tramonto = 0; // tempo del tramonto.
  var tempo_transito = 0; // tempo transito.
  var azimut_sorgere = 0; // azimut sorgere.
  var azimut_tramonto = 0; // azimut tramonto.
  var st_astri_sl = 0; //
  var njd1 = njd * 1; // giorno giuliano corretto per il sorgere o per il tramonto.
  var ce_par = 0; // coordinate correte per la parallasse

  var verifica1 = 0;
  var verifica2 = 0;

  // inizio delle 4 iterazioni previste per il calcolo del sorgere di un astro.

  // ST_ASTRO_DATA Array(AZSC,AZTC,TMGS,TMGTR,TMGT)
  //                      0    1    2    3     4

  for (a = 0; a < 8; a++) {
    if (astro == 'L') {
      p_astro = pos_luna(njd1);
      ce_par = cor_parall(
        njd1,
        p_astro[0],
        p_astro[1],
        1.019,
        latitudine,
        longitudine,
        altitudine,
      );
      p_astro[0] = ce_par[0];
      p_astro[1] = ce_par[1];
    } // astro di riferimento: luna.
    else if (astro == 'S') {
      p_astro = pos_sole(njd1);
    } // astro di riferimento: sole.

    st_astri_sl = ST_ASTRO_DATA(
      njd1,
      p_astro[0],
      p_astro[1],
      longitudine,
      latitudine,
      altitudine,
      raggio,
    );
    tempo_sorgere = st_astri_sl[2] + tempo_rifst; // tempo del sorgere.
    tempo_sorgere = ore_24(tempo_sorgere);

    if (tempo_sorgere > 22) {
      verifica1 = 22;
    }
    if (verifica1 == 22 && tempo_sorgere < 22) {
      verifica2 = 22;
    }
    if (verifica1 == 22 && verifica2 == 22) {
      njd1 = njd;
      tempo_sorgere = 0;
    } else {
      njd1 = njd * 1 + tempo_sorgere / 24;
    }
  }

  azimut_sorgere = st_astri_sl[0].toFixed(1); // azimut del sorgere di un astro.
  njd1 = njd;
  verifica1 = 0;
  verifica2 = 0;

  // inizio delle 4 iterazioni previste per il calcolo del transito di un astro.

  for (a = 0; a < 8; a++) {
    if (astro == 'L') {
      p_astro = pos_luna(njd1);
      ce_par = cor_parall(
        njd1,
        p_astro[0],
        p_astro[1],
        1.019,
        latitudine,
        longitudine,
        altitudine,
      );
      p_astro[0] = ce_par[0];
      p_astro[1] = ce_par[1];
    } // astro di riferimento: luna.
    else if (astro == 'S') {
      p_astro = pos_sole(njd1);
    } // astro di riferimento: sole.

    st_astri_sl = ST_ASTRO_DATA(
      njd1,
      p_astro[0],
      p_astro[1],
      longitudine,
      latitudine,
      altitudine,
      raggio,
    );
    tempo_transito = st_astri_sl[3] + tempo_rifst;
    tempo_transito = ore_24(tempo_transito);
    // tempo del transito.
    if (tempo_transito > 22) {
      verifica1 = 22;
    }
    if (verifica1 == 22 && tempo_transito < 22) {
      verifica2 = 22;
    }
    if (verifica1 == 22 && verifica2 == 22) {
      njd1 = njd;
      tempo_transito = 0;
    } else {
      njd1 = njd * 1 + tempo_transito / 24;
    }
  }

  njd1 = njd;
  verifica1 = 0;
  verifica2 = 0;

  // inizio delle 4 iterazioni previste per il calcolo del tramontare di un astro.

  for (a = 0; a < 8; a++) {
    if (astro == 'L') {
      p_astro = pos_luna(njd1);
      ce_par = cor_parall(
        njd1,
        p_astro[0],
        p_astro[1],
        1.019,
        latitudine,
        longitudine,
        altitudine,
      );
      p_astro[0] = ce_par[0];
      p_astro[1] = ce_par[1];
    } // astro di riferimento: luna.
    else if (astro == 'S') {
      p_astro = pos_sole(njd1);
    } // astro di riferimento: sole.

    st_astri_sl = ST_ASTRO_DATA(
      njd1,
      p_astro[0],
      p_astro[1],
      longitudine,
      latitudine,
      altitudine,
      raggio,
    );
    tempo_tramonto = st_astri_sl[4] + tempo_rifst; // tempo del tramonto
    tempo_tramonto = ore_24(tempo_tramonto);

    if (tempo_tramonto > 22) {
      verifica1 = 22;
    }
    if (verifica1 == 22 && tempo_tramonto < 22) {
      verifica2 = 22;
    }
    if (verifica1 == 22 && verifica2 == 22) {
      njd1 = njd;
      tempo_tramonto = 0;
    } else {
      njd1 = njd * 1 + tempo_tramonto / 24;
    }
  }

  azimut_tramonto = st_astri_sl[1].toFixed(1); // azimut del tramontare di un astro.
  njd1 = njd;
  verifica1 = 0;
  verifica2 = 0;

  if (tempo_sorgere > 0) {
    tempo_sorgere = sc_ore_hm(tempo_sorgere);
  } else if (tempo_sorgere == 0) {
    tempo_sorgere = '';
  }

  if (tempo_transito > 0) {
    tempo_transito = sc_ore_hm(tempo_transito);
  } else if (tempo_transito == 0) {
    tempo_transito = '';
  }

  if (tempo_tramonto > 0) {
    tempo_tramonto = sc_ore_hm(tempo_tramonto);
  } else if (tempo_tramonto == 0) {
    tempo_tramonto = '';
  }

  var tempi_st = new Array(
    azimut_sorgere,
    azimut_tramonto,
    tempo_sorgere,
    tempo_transito,
    tempo_tramonto,
  ); //  restituisce le variabili.
  //                            0              1              2             3              4

  return tempi_st;
}

//      FUNZIONE PER IL CALCOLO DEL SORGERE E DEL TRAMONTARE DEL SOLE E DELLA LUNA - (metodo preciso )                        - FINE
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

// funzione per il calcolo dell'equazione del tempo - inizio

function eq_tempo() {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2011.
  // funzione per il calcolo del valore dell'equazione del tempo per la data odierna.
  // algoritmo di P.D. SMITH.

  var njd = calcola_jd(); //   giorno giuliano in questo istante a Greenwich.
  njd = jdHO(njd) + 0.5; //   g. g. a mezzogiorno di Greenwich.

  var ar_sole = pos_sole(njd); //   calcolo dell'ascensione retta del sole.
  var anno = jd_data(njd); //   anno di riferimento.

  var Tempo_medio_Greenw = tsg_tmg_data(ar_sole[0], anno[2], njd); //   tempo medio di Greenwich.
  var valore_et = 12 - Tempo_medio_Greenw; //   valore dell'equazione del tempo.

  valore_et = valore_et * 60; //   valore in minuti.

  valore_et = valore_et.toFixed(6);

  return valore_et;
}
// funzione per il calcolo dell'equazione del tempo - fine

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

// funzione per il calcolo dell'equazione del tempo - inizio

function eq_tempo_data(anno, njd) {
  // funzione per il calcolo dell'equazione del tempo.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009
  // algoritmo di P.D. SMITH.

  njd = jdHO(njd) + 0.5; // riporta il g.g. della data al mezzogiorno.

  var ar_sole = pos_sole(njd); //   calcolo dell'ascensione retta del sole.
  var Tempo_medio_Greenw = tsg_tmg_data(ar_sole[0], anno, njd); //   tempo medio di Greenwich.
  var valore_et = 12 - Tempo_medio_Greenw; //   valore dell'equazione del tempo.

  valore_et = valore_et * 60; //   valore in minuti.

  valore_et = valore_et.toFixed(6);

  return valore_et;
}
// funzione per il calcolo dell'equazione del tempo - fine

// funzione per il calcolo dell'equazione del tempo - inizio

function eq_tempo_data2(anno, njd) {
  // funzione per il calcolo dell'equazione del tempo.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) gennaio 2012.
  // algoritmo di MEEUS.

  njd = jdHO(njd); // riporta il g.g. all'ora H0(zero) del giorno.

  var ar_sole = pos_sole(njd); //   calcolo dell'ascensione retta del sole.
  var ar_sole_app = pos_app(njd, ar_sole[0], ar_sole[1]);
  var TSG = temposid_app(njd);
  var valore_et = 0;
  var h = TSG - ar_sole_app[0];

  if (h < 0) {
    valore_et = 12 + h;
  }
  if (h > 0) {
    valore_et = h - 12;
  }

  valore_et = valore_et * 60; //   valore in minuti.

  valore_et = valore_et.toFixed(6);

  return valore_et;
}
// funzione per il calcolo dell'equazione del tempo - fine

// **********************************************************************************************
// **********************************************************************************************
// **********************                                                ************************
// **********************                CALCOLO DELLE EFFEMERIDI        ************************
// **********************                                                ************************
// **********************************************************************************************
// **********************************************************************************************
// **********************************************************************************************

//  FUNZIONI PER IL CALCOLO DI EFFEMERIDI    - INIZIO
//

function quadrante(y, x) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009
  // funzione per l'individuazione del quadrante corretto della tangente.
  // y e x variabili numeriche.
  // Math.abs  restituisce il valore assoluto di un numero.

  var alfa = Math.abs(Math.atan(y / x));

  alfa = (alfa * 180) / Math.PI;

  if (x > 0 && y > 0) {
    alfa = alfa;
  } else if (x < 0 && y > 0) {
    alfa = 180 - alfa;
  } else if (x < 0 && y < 0) {
    alfa = 180 + alfa;
  } else if (x > 0 && y < 0) {
    alfa = 360 - alfa;
  }

  return alfa; // valore angolo in gradi sessadecimali.
}

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

// trasformazione coordinate eclittiche in equatoriali                                                          - inizio.

function trasf_ecli_equa(njd, long, lat) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009
  // funzione per trasformare le coordinate eclittiche in equatoriali.
  // long e lat: coordinate ecclittiche dell'astro in gradi sessadecimali.
  //  njd=numero del giorno giuliano.

  var obli_eclittica = obli_ecli(njd);
  obli_eclittica = (obli_eclittica / 180) * Math.PI;

  long = (long / 180) * Math.PI;
  lat = (lat / 180) * Math.PI;

  var y =
    Math.sin(long) * Math.cos(obli_eclittica) -
    Math.tan(lat) * Math.sin(obli_eclittica);
  var x = Math.cos(long);

  var ascensione_retta = quadrante(y, x) / 15;

  var declinazione =
    Math.sin(lat) * Math.cos(obli_eclittica) +
    Math.cos(lat) * Math.sin(obli_eclittica) * Math.sin(long);
  declinazione = Math.asin(declinazione);
  declinazione = (declinazione * 180) / Math.PI;

  var coord_equa = new Array(ascensione_retta, declinazione); //  restituisce le variabili AR e DEC .

  return coord_equa;
}

// trasformazione coordinate eclittiche in equatoriali                                                            - fine.

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

function obli_ecli(njd) {
  // calcola l'obliquità dell'eclittica.
  // per l'equinozio della data.
  // T= numero di secoli giuliani dallo 0.5 gennaio 1900.

  var T = (njd - 2415020.0) / 36525;

  var obli_eclittica =
    23.452294 - 0.0130125 * T - 0.00000164 * T * T + 0.000000503 * T * T * T;

  return obli_eclittica; //obliquità in gradi
}

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

function precess(njd0, njd1, ar, de) {
  // funzione per la precessione degli equinozi (metodo rigoroso)
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) luglio 2012

  // njd0= numero del giorno giuliano           - epoca iniziale.
  // njd1= numero del giorno giuliano epoca finale.
  //   ar= ascensione retta in ore decimali     - epoca iniziale.
  //   de= declinazione in gradi sessadecimali  - epoca iniziale.

  // var Ti= 1900.0+t0;      // epoca iniziale.
  // var Tf= 1900.0+t0+t     // epoca finale.

  var t0 = (njd0 - 2415020.313) / 36524.2199;
  var t = (njd1 - njd0) / 36524.2199;

  var psi = (2304.25 + 1.396 * t0) * t + 0.302 * t * t + 0.018 * t * t * t;
  var zet = psi + 0.791 * t * t + 0.001 * t * t * t;
  var omi = (2004.682 - 0.853 * t0) * t - 0.426 * t * t - 0.042 * t * t * t;

  ar = ar * 15;
  psi = psi / 3600;
  zet = zet / 3600;
  omi = omi / 3600;

  var A = Math.cos(Rad(de)) * Math.sin(Rad(ar + psi));
  var B =
    Math.cos(Rad(omi)) * Math.cos(Rad(de)) * Math.cos(Rad(ar + psi)) -
    Math.sin(Rad(omi)) * Math.sin(Rad(de));
  var C =
    Math.sin(Rad(omi)) * Math.cos(Rad(de)) * Math.cos(Rad(ar + psi)) +
    Math.cos(Rad(omi)) * Math.sin(Rad(de));

  var deP = Math.asin(C);
  deP = Rda(deP); // deP= declinazione sessadecimale per l'epoca finale

  var arP = quadrante(Rda(A), Rda(B));
  arP = arP + zet;
  arP = gradi_360(arP);
  arP = arP / 15;
  // arP= ascensione retta decimale per l'epoca finale

  var coord = new Array(arP, deP, psi, zet, omi); // arP e deP per l'epoca finale.

  return coord;
}

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

function pos_stars(njd0, ar0, de0, dar0, dde0, njd1) {
  // funzione per il calcolo della posizione di una stella
  // moto proprio e precessione degli equinozi (metodo rigoroso)
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) luglio 2012

  //  njd0= numero del giorno giuliano                      - epoca iniziale.
  //   ar0= ascensione retta in ore decimali                - epoca iniziale.
  //   de0= declinazione in gradi sessadecimali             - epoca iniziale.
  //  dar0= moto proprio per l'ascensione retta in gradi    - epoca iniziale.
  //  dde0= moto proprio per la declinazione in gradi       - epoca iniziale.
  //  njd1= numero del giorno giuliano                      - epoca finale.
  //
  //  dar0*15/3600   **** dde0/3600 VERIFICARE!!!!!!!!!!!!!

  // calcolo del moto proprio:

  var t = (njd1 - njd0) / 36524.2199;
  t = t * 100; // in anni tropici.

  var delta_ar = dar0 * t; // ascensione retta.
  var delta_de = dde0 * t; // declinazione.

  var ar0 = ar0 * 15 + delta_ar; // ascensione retta in gradi+moto proprio.
  var de0 = de0 + delta_de; // declinazione in gradi+moto proprio.
  // PRECESSIONE.
  // ascensione retta in ore decimali.
  ar0 = ar0 / 15;

  var coo_eq = precess(njd0, njd1, ar0, de0);

  var ar1 = coo_eq[0]; // ascensione retta in ore decimali per l'epoca finale.
  var de1 = coo_eq[1]; // declinazione per l'epoca finale.

  var coord = new Array(ar1, de1); // arP e deP per l'epoca finale.

  return coord;
}

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

//                    funzione per il calcolo dell'angolo orario H.                                               INIZIO.

function angolo_H(njd, Ar, Long) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) settembre 2010
  // njd= numero del giorno giuliano della data in T.U.
  //   Ar= ascensione retta in ore decimali.
  // Long= Longitudine dell'ooseravtore.

  var TSG = temposid(njd); // tempo siderale a Greenwich.
  var TS_Loc = TSL(TSG, Long); // tempo siderale Locale.
  var ang_H = TS_Loc - Ar; // angolo orario H.

  ang_H = ore_24(ang_H) * 1; // H in ore decimali

  return ang_H;
}

//                     funzione per il calcolo dell'angolo orario H.                                                FINE.

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

//                    trasformazione delle coordinate equatoriali in azimutali                                     INIZIO.

function trasf_equa_azim(njd, Ar, De, Long, Lat) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) giugno 2013
  // njd=  numero del giorno giuliano dell'istante da calcolare riferito al T.U.
  // Ar=   ascensione retta in ore decimali.
  // De=   declinazione in gradi sessadecimali
  // Long= Longitudine dell'osservatore =- per ovest rispetto a Greenwich
  // Lat=  Latitudine dell'osservatore.

  var ang_H = angolo_H(njd, Ar, Long); // calcolo dell'angolo orario H.

  // trasformare gli angoli sessadecimali in radianti.

  ang_H = Rad(ang_H * 15);
  Ar = Rad(Ar * 15);
  De = Rad(De);
  Long = Rad(Long);
  Lat = Rad(Lat);

  // angolo_a=altezza sull'orizzonte dell'astro.

  var angolo_a =
    Math.sin(De) * Math.sin(Lat) +
    Math.cos(De) * Math.cos(Lat) * Math.cos(ang_H);
  angolo_a = Math.asin(angolo_a); // in radianti.
  angolo_a = Rda(angolo_a); // altezza dell'astro in gradi.

  var azimut =
    (Math.sin(De) - Math.sin(Lat) * Math.sin(Rad(angolo_a))) /
    (Math.cos(Lat) * Math.cos(Rad(angolo_a)));
  azimut = Math.acos(azimut);
  azimut = Rda(azimut);

  azimut = Math.sin(ang_H) < 0 ? (azimut = azimut) : (azimut = 360 - azimut); // operatore ternario.

  var coord_azimut = new Array(angolo_a, azimut); //  restituisce 2 valori: altezza e azimut.

  return coord_azimut;

  // NOTE SUL CALCOLO:
  // Se il seno di ang_H(angolo orario) è negativo (>180°) azimut=azimut, se positivo azimut=360-azimut
}

//                          trasformazione delle coordinate equatoriali in azimutali                        FINE

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

//                          trasformazione delle coordinate altoazimutali in equatoriali                           INIZIO.

function trasf_azim_equa(A, AZ, LAT, TSLO) {
  //   by Salvatore Ruiu Irgoli-Sardegna (Italy) giugno 2013
  //   A=  altezza in gradi sull'orizzonte.
  //  AZ=  azimut in gradi.
  // LAT=  latitudine in gradi.
  // TSLO= Tempo Siderale Locale in ore decimali.

  // Calcolo della declinazione dec:

  var dec =
    Math.sin(Rad(A)) * Math.sin(Rad(LAT)) +
    Math.cos(Rad(A)) * Math.cos(Rad(LAT)) * Math.cos(Rad(AZ));
  dec = Math.asin(dec);
  dec = Rda(dec); // declinazione in gradi sessadecimali.

  // Calcolo dell'Angolo orario H in ore:

  var H =
    (Math.sin(Rad(A)) - Math.sin(Rad(LAT)) * Math.sin(Rad(dec))) /
    (Math.cos(Rad(LAT)) * Math.cos(Rad(dec)));
  H = Math.acos(H);
  H = Rda(H); // Angolo orario H in gradi.

  H = Math.sin(Rad(AZ)) < 0 ? (H = H) : (H = 360 - H); // operatore ternario.
  H = H / 15;

  // angolo orario H in ore.

  var ar = TSLO - H; // Calcolo dell'ascensione retta (ar).

  if (ar < 0) {
    ar = ar + 24;
  } // All'interno dell'intervallo 0-24.

  var coord_equa = new Array(dec, ar, H); //  restituisce 3 valori: declinazione, ascensione retta e angolo orario H.

  return coord_equa;

  // NOTE SUL CALCOLO:
  // L'ascensione retta è misurata in senso opposto all'angolo orario H.
  // Se il seno di AZ(azimut) è negativo (>180°) H=H, se positivo H=360-H
  // Gli angoli (I/O) sono in gradi sessadecimali.
}

//                          trasformazione delle coordinate altoazimutali in equatoriali                             FINE.

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

// funzione per il calcolo dell'equazione di Keplero  -  inizio

function eq_keplero(M, ecc_orbita) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009
  // funzione per il calcolo dell'equazione di Keplero.
  // M= anomalia media in gradi sessadecimali.
  // ecc_orbita= eccentricità dell'orbita.
  // Math.abs  restituisce il valore assoluto.

  M = (M / 180) * Math.PI;
  var E = M;
  var E1 = M;
  var delta_E = 1;

  while (delta_E > 0.000000000001) {
    E = E1;
    E1 = M + ecc_orbita * Math.sin(E);

    delta_E = Math.abs(E - E1); // calcola il valore assoluto del numero.
  }

  var anomalia_vera1 = Math.sqrt((1 + ecc_orbita) / (1 - ecc_orbita));
  var anomalia_vera2 = anomalia_vera1 * Math.tan(E / 2);
  var anomalia_vera = 2 * Math.atan(anomalia_vera2); // in radianti.

  var anomalie = new Array(E, anomalia_vera); // in radianti.

  return anomalie;
}

// funzione per il calcolo dell'equazione di Keplero  -  fine

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

function gradi_360(angolo) {
  // angolo in gradi sessadecimali.
  // riporta l'angolo all'interno dell'intervallo 0° - 360°

  if (angolo > 360) {
    while (angolo > 360) {
      angolo = angolo - 360;
    }
  } else if (angolo < 0) {
    while (angolo < 0) {
      angolo = angolo + 360;
    }
  }

  return angolo;
}

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

// angoli radianti

function Rad(angolo) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2010
  // angolo da gradi sessadecimali in radianti.

  var angolo_rad = (angolo / 180) * Math.PI;

  return angolo_rad;
}

//
//

function Rda(angolo_rad) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2010
  // angolo da radianti in sessadecimali.

  var angolo = (angolo_rad * 180) / Math.PI;

  return angolo;
}

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

// funzione per il calcolo della posizione del sole  - inizio

function pos_sole(njd) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) dicembre 2009
  // funzione per il calcolo della posizione del sole.
  // njd= numero dei giorni giuliani per il T.U. di Greenwich.
  // la data di riferimento per gli elementi orbitali è l'equinozio della data.

  var T = (njd - 2415020.0) / 36525;

  //  Elementi orbitali per l'equinozio della data.

  Long_epoca = 279.69668 + 36000.76892 * T + 0.0003025 * T * T;

  ecc_orbita = 0.01675104 - 0.0000418 * T - 0.000000126 * T * T;

  M = 358.47583 + 35999.04975 * T - 0.00015 * T * T - 0.0000033 * T * T * T;

  Long_perigeo = gradi_360(Long_epoca - M);

  // correzioni ***************

  var A = 153.23 + 22518.7541 * T;
  var B = 216.57 + 45037.5082 * T;
  var C = 312.69 + 32964.3577 * T;
  var D = 350.74 + 445267.1142 * T - 0.00144 * T * T;
  var E = 231.19 + 20.2 * T;
  var H = 353.4 + 65928.7155 * T;

  // angoli in radianti.

  A = Rad(A);
  B = Rad(B);
  C = Rad(C);
  D = Rad(D);
  E = Rad(E);
  H = Rad(H);

  // correzione per la longitudine.

  var delta_L =
    0.00134 * Math.cos(A) +
    0.00154 * Math.cos(B) +
    0.002 * Math.cos(C) +
    0.00179 * Math.sin(D) +
    0.00178 * Math.sin(E);

  // correzioni per il raggio vettore.

  var delta_R =
    0.00000543 * Math.sin(A) +
    0.00001575 * Math.sin(B) +
    0.00001627 * Math.sin(C) +
    0.00003076 * Math.cos(D) +
    0.00000927 * Math.sin(H);

  var semiasse = 0.999996;

  //  calcolo Equazione di Keplero

  M = gradi_360(M); // intervallo 0-360;

  var E = eq_keplero(M, ecc_orbita); // equazione di Keplero.

  var anomalia_vera = E[1]; // restituisce l'anomalia vera in radianti.

  // calcola il valore del raggio vettore.

  var distanzas = semiasse * (1 - ecc_orbita * Math.cos(E[0]));
  distanzas = distanzas + delta_R; // correzione per il raggio vettore.

  // calcola il diametro apparente del Sole in secondi d'arco.

  var diam_app = 1919.22 / distanzas;
  diam_app = diam_app.toFixed(1);

  // parallasse diurna del Sole in gradi.

  var parallasse = 8.794 / 3600 / distanzas;

  var longitudine_sole = Rda(anomalia_vera) + Long_perigeo;

  longitudine_sole = gradi_360(longitudine_sole + delta_L); // longitudine ecclittica del sole + correzione.

  //  coordinate ecclittiche: longitudine_sole,0 per la latitudine.

  var coord_sole = trasf_ecli_equa(njd, longitudine_sole, 0); // trasforma le coordinate ecclittiche in equatoriali: AR,DEC.

  // ELENCO delle variabili restituite dalla funzione [pos_sole].

  // coord_sole[0]=ascensione retta in ore decimali (già diviso * 15). calcolate dalla funzione trasf_ecli_equa.
  // coord_sole[1]=declinazione in gradi sessadecimali.
  coord_sole[2] = longitudine_sole; // longitudine in gradi sessadecimali.
  coord_sole[3] = M; // anomalia media.
  coord_sole[4] = distanzas; // distanza in U.A.
  coord_sole[5] = diam_app; // diametro apparente del Sole.
  coord_sole[6] = parallasse; // parallasse diurna in gradi.

  return coord_sole;
}

// funzione per il calcolo della posizione del sole  - fine

// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

//                            funzione per il calcolo delle 4 fasi lunari                                           inizio

function cfasi_lunari(mese, anno, fase) {
  //  by Salvatore Ruiu Irgoli-Sardegna (Italy) Luglio 2010
  //   funzione per il calcolo delle fasi lunari.
  //    mese= numero del mese da 1 a 12.
  //     anno=anno di riferimento.
  //      k=0.00 per la luna nuova
  //       k=0.25 per il primo quarto.
  //        k=0.50 per la luna piena
  //         k=0.75 per l'ultimo quarto.
  //          fase= valore numerico per la fase 0 - 0.25 - 0.50 - 0.75 sono ammessi solo questi valori.

  var anno_dec = anno + mese / 12;
  var k = (anno_dec - 1900) * 12.3685; // calcolo della costante k.  (parseInt) tronca la parte decimale
  k = parseInt(k) * 1 + fase * 1;

  var T = k / 1236.85;

  var fseno = 166.56 + 132.87 * T - 0.009173 * T * T;
  fseno = (fseno / 180) * Math.PI;

  var njd_fase =
    2415020.75933 +
    29.53058868 * k +
    0.0001178 * T * T -
    0.000000155 * T * T * T +
    0.00033 * Math.sin(fseno);

  // calcolo anomalia media del sole.

  var M =
    359.2242 + 29.10535608 * k - 0.0000333 * T * T - 0.00000347 * T * T * T;
  M = gradi_360(M);
  M = (M / 180) * Math.PI;

  // calcolo anomalia media della luna.

  var M1 =
    306.0253 + 385.81691806 * k + 0.0107306 * T * T + 0.00001236 * T * T * T;
  M1 = gradi_360(M1);
  M1 = (M1 / 180) * Math.PI;

  // calcolo dell'argomento della latitudine della luna.

  var F =
    21.2964 + 390.67050646 * k - 0.0016528 * T * T - 0.00000239 * T * T * T;
  F = gradi_360(F);
  F = (F / 180) * Math.PI;

  // calcolo correzioni per la luna nuova e piena.

  var correzione1 = 0;

  if (fase == 0 || fase == 0.5) {
    correzione1 =
      (0.1734 - 0.000393 * T) * Math.sin(M) +
      0.0021 * Math.sin(2 * M) -
      0.4068 * Math.sin(M1) +
      0.0161 * Math.sin(2 * M1) -
      0.0004 * Math.sin(3 * M1) +
      0.0104 * Math.sin(2 * F) -
      0.0051 * Math.sin(M + M1) -
      0.0074 * Math.sin(M - M1) +
      0.0004 * Math.sin(2 * F + M) -
      0.0004 * Math.sin(2 * F - M) -
      0.0006 * Math.sin(2 * F + M1) +
      0.001 * Math.sin(2 * F - M1) +
      0.0005 * Math.sin(M + 2 * M1);
  } else if (fase == 0.25 || fase == 0.75) {
    correzione1 =
      (0.1721 - 0.0004 * T) * Math.sin(M) +
      0.0021 * Math.sin(2 * M) -
      0.628 * Math.sin(M1) +
      0.0089 * Math.sin(2 * M1) -
      0.0004 * Math.sin(3 * M1) +
      0.0079 * Math.sin(2 * F) -
      0.0119 * Math.sin(M + M1) -
      0.0047 * Math.sin(M - M1) +
      0.0003 * Math.sin(2 * F + M) -
      0.0004 * Math.sin(2 * F - M) -
      0.0006 * Math.sin(2 * F + M1) +
      0.0021 * Math.sin(2 * F - M1) +
      0.0003 * Math.sin(M + 2 * M1) +
      0.0004 * Math.sin(M - 2 * M1) -
      0.0003 * Math.sin(2 * M + M1);
  } else {
    alert('Valore fase ' + fase + ' non valido!');
  }

  var njd_fase = njd_fase + correzione1; // per la luna nuova.

  // njd_fase= numero dei giorni giuliani.
  return njd_fase;
}

//                            funzione per il calcolo delle 4 fasi lunari                                             fine

function rec_mese(mese) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) settembre 2010
  // recupero del nome del mese vigente.

  if (mese != undefined) {
    mese = mese - 1;
  }

  if (mese == undefined) {
    var data = new Date();
    var mese = data.getMonth(); // mese 0 a 11
    var nome_mese = '';
  }

  if (mese == 0) {
    nome_mese = 'Gennaio';
  } else if (mese == 1) {
    nome_mese = 'Febbraio';
  } else if (mese == 2) {
    nome_mese = 'Marzo';
  } else if (mese == 3) {
    nome_mese = 'Aprile';
  } else if (mese == 4) {
    nome_mese = 'Maggio';
  } else if (mese == 5) {
    nome_mese = 'Giugno';
  } else if (mese == 6) {
    nome_mese = 'Luglio';
  } else if (mese == 7) {
    nome_mese = 'Agosto';
  } else if (mese == 8) {
    nome_mese = 'Settembre';
  } else if (mese == 9) {
    nome_mese = 'Ottobre';
  } else if (mese == 10) {
    nome_mese = 'Novembre';
  } else if (mese == 11) {
    nome_mese = 'Dicembre';
  }

  return nome_mese;
}

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

//                                FUNZIONE PER IL CALCOLO DELLE EFFEMERIDI DEL SOLE                 -INIZIO

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function effemeridi_sole(TEMPO_RIF, LAT, LON, ALT, ITERAZIONI, LAN) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) Ottobre 2011.
  // funzione per il calcolo delle effemeridi del Sole.

  // Parametri utilizzati

  // TEMPO_RIF= "TL" o "TU"  tempo locale o tempo universale.
  // LAT= latitudine in gradi sessadecimali.
  // LON= longtudine in gradi sessadecimali.
  // ALT= altitudine in metri.
  // ITERAZIONE =numero di ripetizioni del calcolo.
  // LAN="EN" versione in inglese.

  var njd = calcola_jdUT0(); // numero del giorno giuliano all'ora 0 di oggi.

  njd = njd + 0.00078; // correzione per il Terrestrial Time.

  var data_ins = 0; // data
  var data_inser = 0; // data

  var numero_iterazioni = ITERAZIONI;

  var effe_sole = 0;
  var ar_sole = 0;
  var de_sole = 0;
  var classetab = 'colore_tabellaef1';
  var crep = 0; // crepuscolo astronomico.
  var coo_app = 0; // coordinate equatoriali apparenti.
  var costl = ''; // costellazione.
  var t_locale = 0;

  var effe1 = 0;

  document.write("<table width=100% class='.table_effemeridi'>");
  document.write('   <tr>');

  //  versione in italiano.

  if (LAN != 'EN') {
    // diverso da EN
    document.write("     <td class='colore_tabella'>Data:</td>");
    document.write("     <td class='colore_tabella'>Sorge:</td>");
    document.write("     <td class='colore_tabella'>Culmina:</td>");
    document.write("     <td class='colore_tabella'>Tramonta:</td>");
    document.write("     <td class='colore_tabella'>Az. Sorge:</td>");
    document.write("     <td class='colore_tabella'>Az. Tram.:</td>");
    document.write("     <td class='colore_tabella'>Ascensione Retta:</td>");
    document.write("     <td class='colore_tabella'>Declinazione:</td>");
    document.write("     <td class='colore_tabella'>Inizio Crep.:</td>");
    document.write("     <td class='colore_tabella'>Fine Crep.:</td>");
    document.write("     <td class='colore_tabella'>Cost.:</td>");
  }

  //  versione in inglese.

  if (LAN == 'EN') {
    document.write("     <td class='colore_tabella'>Date:</td>");
    document.write("     <td class='colore_tabella'>Rise:</td>");
    document.write("     <td class='colore_tabella'>Transit:</td>");
    document.write("     <td class='colore_tabella'>Set:</td>");
    document.write("     <td class='colore_tabella'>Az. Rise:</td>");
    document.write("     <td class='colore_tabella'>Az. Set.:</td>");
    document.write("     <td class='colore_tabella'>Right Ascension:</td>");
    document.write("     <td class='colore_tabella'>Declination:</td>");
    document.write("     <td class='colore_tabella'>Beg. Twilight:</td>");
    document.write("     <td class='colore_tabella'>End. Twilight:</td>");
    document.write("     <td class='colore_tabella'>Const.:</td>");
  }

  document.write('   </tr>');

  njd = njd - 1;

  for (b = 0; b < numero_iterazioni; b++) {
    njd = njd + 1;
    effe1 = ST_SOLE_LUNA(njd, TEMPO_RIF, 'S', LON, LAT, ALT, 0.25);

    effe_sole = pos_sole(njd);

    coo_app = pos_app(njd, effe_sole[0], effe_sole[1]); // coordinate apparenti.

    ar_sole = sc_ore(coo_app[0]); // ascensione retta.
    de_sole = sc_angolo(coo_app[1]); // declinazione.

    crep = crepuscolo(njd, TEMPO_RIF, LON, LAT, ALT);

    data_ins = jd_data(njd);

    if (LAN != 'EN') {
      data_inser =
        Lnum(parseInt(data_ins[0]), 2) +
        ' : ' +
        Lnum(parseInt(data_ins[1]), 2) +
        '| ' +
        data_ins[3];
    } // versione in italiano.
    if (LAN == 'EN') {
      data_inser =
        Lnum(parseInt(data_ins[0]), 2) +
        ' : ' +
        Lnum(parseInt(data_ins[1]), 2) +
        '| ' +
        data_ins[4];
    } // versione in inglese.

    costl = costell(coo_app[0]); // costellazione.

    if (b % 2 == 0) {
      classetab = 'colore_tabellaef2';
    } else {
      classetab = 'colore_tabellaef1';
    }

    document.write('   <tr>');
    document.write(
      "     <td class='" + classetab + "'>" + data_inser + '</td>',
    );
    document.write("     <td class='" + classetab + "'>" + effe1[2] + '</td>');
    document.write("     <td class='" + classetab + "'>" + effe1[3] + '</td>');
    document.write("     <td class='" + classetab + "'>" + effe1[4] + '</td>');
    document.write(
      "     <td class='" + classetab + "'>" + effe1[0] + '&deg;</td>',
    );
    document.write(
      "     <td class='" + classetab + "'>" + effe1[1] + '&deg;</td>',
    );
    document.write("     <td class='" + classetab + "'>" + ar_sole + '</td>');
    document.write("     <td class='" + classetab + "'>" + de_sole + '</td>');
    document.write("     <td class='" + classetab + "'>" + crep[0] + '</td>');
    document.write("     <td class='" + classetab + "'>" + crep[1] + '</td>');
    document.write("     <td class='" + classetab + "'>" + costl + '</td>');

    document.write('   </tr>');
  }
  document.write(' </table>');
}

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

//                                FUNZIONE PER IL CALCOLO DELLE EFFEMERIDI DEL SOLE                     FINE

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

//                                FUNZIONE PER IL CALCOLO DELLE EFFEMERIDI DELLA LUNA                 INIZIO

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function effemeridi_luna(TEMPO_RIF, LAT, LON, ALT, ITERAZIONI, LAN) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) Ottobre 2011
  // funzione per il calcolo delle effemeridi del Sole.
  // Parametri utilizzati:
  // TEMPO_RIF= "TL" o "TU"  tempo locale o tempo universale.
  // LAT= latitudine in gradi sessadecimali.
  // LON= longtudine in gradi sessadecimali.
  // ALT= altitudine in metri.
  // ITERAZIONE =numero di ripetizioni del calcolo.
  // LAN="EN" versione in inglese.

  var njd = calcola_jdUT0(); // numero del giorno giuliano all'ora 0 di oggi.

  njd = njd + 0.00078; // correzione per il Terrestrial Time.

  var data_ins = 0; // data
  var data_inser = 0; // data

  var numero_iterazioni = ITERAZIONI;

  var effe_luna = 0;
  var ar_luna = 0;
  var de_luna = 0;
  var classetab = 'colore_tabellaef1';
  var elongazione = 0;
  var effe1 = 0;
  var coo_app = 0; // coordinate equatoriali apparenti.
  var costl = ''; // costellazione.

  document.write("<table width=100% class='.table_effemeridi'>");
  document.write('   <tr>');

  //  versione in italiano.

  if (LAN != 'EN') {
    // diverso da EN
    document.write("     <td class='colore_tabella'>Data:</td>");
    document.write("     <td class='colore_tabella'>Sorge:</td>");
    document.write("     <td class='colore_tabella'>Culmina:</td>");
    document.write("     <td class='colore_tabella'>Tramonta:</td>");
    document.write("     <td class='colore_tabella'>Az. Sorge:</td>");
    document.write("     <td class='colore_tabella'>Az. Tramonta:</td>");
    document.write("     <td class='colore_tabella'>Ascensione Retta:</td>");
    document.write("     <td class='colore_tabella'>Declinazione:</td>");
    document.write("     <td class='colore_tabella'>Fase:</td>");
    document.write("     <td class='colore_tabella'>Elong:</td>");
    document.write("     <td class='colore_tabella'>Cost.:</td>");
  }

  //  versione in inglese.

  if (LAN == 'EN') {
    document.write("     <td class='colore_tabella'>Date:</td>");
    document.write("     <td class='colore_tabella'>Rise:</td>");
    document.write("     <td class='colore_tabella'>Transit:</td>");
    document.write("     <td class='colore_tabella'>Set:</td>");
    document.write("     <td class='colore_tabella'>Az. Rise:</td>");
    document.write("     <td class='colore_tabella'>Az. Set:</td>");
    document.write("     <td class='colore_tabella'>Right Ascension:</td>");
    document.write("     <td class='colore_tabella'>Declination:</td>");
    document.write("     <td class='colore_tabella'>Phase:</td>");
    document.write("     <td class='colore_tabella'>Elong:</td>");
    document.write("     <td class='colore_tabella'>Const.:</td>");
  }

  document.write('   </tr>');

  // ST_SOLE_LUNA Array(azimut_sorgere,azimut_tramonto,tempo_sorgere,tempo_transito,tempo_tramonto)
  //                          0              1              2             3             4

  njd = njd - 1;

  for (b = 0; b < numero_iterazioni; b++) {
    njd = njd + 1;
    effe1 = ST_SOLE_LUNA(njd, TEMPO_RIF, 'L', LON, LAT, ALT, 0.25);

    effe_luna = pos_luna(njd);
    coo_app = pos_app(njd, effe_luna[0], effe_luna[1]); // coordinate apparenti.

    ar_luna = sc_ore(coo_app[0]); // ascensione retta.
    de_luna = sc_angolo(coo_app[1]); // declinazione.

    elongazione = effe_luna[4].toFixed(2);

    data_ins = jd_data(njd);

    if (LAN != 'EN') {
      data_inser =
        Lnum(parseInt(data_ins[0]), 2) +
        ' : ' +
        Lnum(parseInt(data_ins[1]), 2) +
        '| ' +
        data_ins[3];
    } // versione in italiano.
    if (LAN == 'EN') {
      data_inser =
        Lnum(parseInt(data_ins[0]), 2) +
        ' : ' +
        Lnum(parseInt(data_ins[1]), 2) +
        '| ' +
        data_ins[4];
    } // versione in inglese.

    fase_luna = effe_luna[3].toFixed(2);

    costl = costell(coo_app[0]); // costellazione.

    if (b % 2 == 0) {
      classetab = 'colore_tabellaef2';
    } else {
      classetab = 'colore_tabellaef1';
    }

    document.write('   <tr>');
    document.write(
      "     <td class='" + classetab + "'>" + data_inser + '</td>',
    );
    document.write("     <td class='" + classetab + "'>" + effe1[2] + '</td>');
    document.write("     <td class='" + classetab + "'>" + effe1[3] + '</td>');
    document.write("     <td class='" + classetab + "'>" + effe1[4] + '</td>');
    document.write(
      "     <td class='" + classetab + "'>" + effe1[0] + '&deg;</td>',
    );
    document.write(
      "     <td class='" + classetab + "'>" + effe1[1] + '&deg;</td>',
    );
    document.write("     <td class='" + classetab + "'>" + ar_luna + '</td>');
    document.write("     <td class='" + classetab + "'>" + de_luna + '</td>');
    document.write("     <td class='" + classetab + "'>" + fase_luna + '</td>');
    document.write(
      "     <td class='" + classetab + "'>" + elongazione + '</td>',
    );
    document.write("     <td class='" + classetab + "'>" + costl + '</td>');

    document.write('   </tr>');
  }
  document.write(' </table>');
}

function cor_parall(njd, AR, DE, P, LAT, LON, ALT) {
  // funzione per il calcolo della correzione delle coordinate equatoriali per effetto della parallasse.
  // parallasse in gradi

  var TSG = temposid(njd); // calcola il tempo medio a Greenwich

  var H = angolo_H(njd, AR, LON) * 15; // calcola l'angolo orario in gradi.
  var Hr = (H / 180) * Math.PI; // angolo orario in radianti.

  // calcolare i valori psin e pcos   - inizio

  var LATr = (LAT / 180) * Math.PI; // latitudine  in radianti.
  var LONr = (LON / 180) * Math.PI; // longitudine in radianti.

  var U = Math.atan(0.996647 * Math.tan(LATr));

  var pseno = 0.996647 * Math.sin(U) + (ALT / 6378140) * Math.sin(LATr);
  var pcoseno = Math.cos(U) + (ALT / 6378140) * Math.cos(LATr);

  // calcolare i valori psin e pcos   - fine

  var Pr = (P / 180) * Math.PI; // Parallasse in radianti

  var r = 1 / Math.sin(Pr);

  var ARr = (AR / 180) * Math.PI; // AR in radianti.
  var DEr = (DE / 180) * Math.PI; // DE in radianti.

  var Delta_AR1 = pcoseno * Math.sin(Hr);
  var Delta_AR2 = r * Math.cos(DEr) - pcoseno * Math.cos(Hr);

  var Delta_AR = Math.atan(Delta_AR1 / Delta_AR2);

  Delta_AR = (Delta_AR * 180) / Math.PI; // in gradi

  var H1 = H + Delta_AR;
  var H1r = (H1 / 180) * Math.PI;

  var ARp = AR - Delta_AR / 15; // ASCENSIONE RETTA correzione ascensione retta

  var Delta_DE1 = Math.cos(H1r) * (r * Math.sin(DEr) - pseno);
  var Delta_DE2 = r * Math.cos(DEr) * Math.cos(Hr) - pcoseno;

  var DEp = Math.atan(Delta_DE1 / Delta_DE2);

  DEp = (DEp * 180) / Math.PI; // DECLINAZION correzione declinazione.

  var ce_par = new Array(ARp, DEp); // coordinate equatoriali ridotte.

  return ce_par;
}
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

//                                FUNZIONE PER IL CALCOLO DELLE EFFEMERIDI DELLA LUNA                  FINE

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                               FUNZIONE PER IL CALCOLO DEL CREPUSCOLO ASTRONOMICO                   INIZIO
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function crepuscolo(njd, tempo_rif, longitudine, latitudine, altitudine) {
  // funzione per il calcolo del crepuscolo astronomico.
  // FUNZIONE DA ELIMINARE e sostituire con crepuscolo_UT

  var tempo_rifst = 0; // tempo di riferimento per il sorgere e il tramonto.
  //
  if (tempo_rif == 'TL') {
    tempo_rifst = -fuso_loc();
  } // riferimento al tempo locale.
  else if (tempo_rif == 'TU') {
    tempo_rifst = 0;
  } // il riferimento rimane il TU

  var ps_sole = pos_sole(njd);
  var DEs = ps_sole[1];

  var LATr = (latitudine / 180) * Math.PI;
  var DEr = (DEs / 180) * Math.PI;

  var H = Math.acos(-Math.tan(LATr) * Math.tan(DEr));

  var H1 = Math.acos(
    (Math.cos(1.88495556) - Math.sin(LATr) * Math.sin(DEr)) /
      (Math.cos(LATr) * Math.cos(DEr)),
  );

  var H = (H * 180) / Math.PI;
  var H1 = (H1 * 180) / Math.PI;

  var T = ((H1 - H) / 15) * 0.9973;

  // new Array(azimut_sorgere,azimut_tramonto,tempo_sorgere,tempo_transito,tempo_tramonto)
  //                 0              1              2             3              4

  var p_sole = ST_ASTRO_DATA(
    njd,
    ps_sole[0],
    ps_sole[1],
    longitudine,
    latitudine,
    altitudine,
    0.25,
  );

  var crep_m = ore_24(p_sole[2] - T + tempo_rifst); // crepuscolo del mattino.
  var crep_s = ore_24(p_sole[4] + T + tempo_rifst); // crepuscolo serale

  crep_m = sc_ore_hm(crep_m); // crepuscolo del mattino.
  crep_s = sc_ore_hm(crep_s); // crepuscolo serale

  var tempi_crep = new Array(crep_m, crep_s);

  return tempi_crep;
}

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                               FUNZIONE PER IL CALCOLO DEL CREPUSCOLO ASTRONOMICO                     FINE
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                               FUNZIONE PER IL CALCOLO DEL CREPUSCOLO ASTRONOMICO UT                INIZIO
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function crepuscolo_UT(njd, longitudine, latitudine, altitudine) {
  // funzione per il calcolo del crepuscolo astronomico per il T.U. di Greenwich
  // aggiornata al 03/12/2011.
  // by Salvatore Ruiu - Irgoli (Italy).
  // (in sostituzione della funzione crepuscolo.)
  // IL Sole si trova a -18 gradi sotto l'orizzonte locale. 90+18=108

  var ps_sole = pos_sole(njd);
  var DEs = ps_sole[1]; // declinazione del Sole.

  var LATr = Rad(latitudine); // angolo in radianti.
  var DEr = Rad(DEs); // angolo in radianti.

  var H = Math.acos(-Math.tan(LATr) * Math.tan(DEr)); // angolo orario

  var H1 = Math.acos(
    (Math.cos(Rad(108)) - Math.sin(LATr) * Math.sin(DEr)) /
      (Math.cos(LATr) * Math.cos(DEr)),
  );

  var H = Rda(H); // angolo da radiante a sessadecimale.
  var H1 = Rda(H1); // angolo da radiante a sessadecimale.

  var T = ((H1 - H) / 15) * 0.9973;

  var p_sole = ST_SOLE(njd, longitudine, latitudine, altitudine); //Sorgere e tramontare del Sole.

  var crep_m = ore_24(p_sole[2] - T); // crepuscolo del mattino.
  var crep_s = ore_24(p_sole[4] + T); // crepuscolo serale.

  var leng_day = p_sole[4] - p_sole[2]; // durata del giorno= ttramonto-tsorge del sole.
  var leng_crp = crep_s - crep_m; // durata del crepuscolo astronomico.
  var le_night = 24 - leng_crp; // durata della notte astronomica.

  var tempi_crep = new Array(crep_m, crep_s, leng_day, leng_crp, le_night);

  return tempi_crep;
}

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                               FUNZIONE PER IL CALCOLO DEL CREPUSCOLO ASTRONOMICO UT                  FINE
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                               FUNZIONE PER IL CALCOLO DEL CREPUSCOLO CIVILE UT                INIZIO
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function crepuscolo_CV(njd, longitudine, latitudine, altitudine) {
  // funzione per il calcolo del crepuscolo civile per il T.U. di Greenwich
  // aggiornata al 03/12/2011.
  // by Salvatore Ruiu - Irgoli (Italy).
  // IL Sole si trova a -6 gradi sotto l'orizzonte locale. 90+6 .

  var ps_sole = pos_sole(njd);
  var DEs = ps_sole[1]; // declinazione del Sole.

  var LATr = Rad(latitudine); // angolo in radianti.
  var DEr = Rad(DEs); // angolo in radianti.

  var H = Math.acos(-Math.tan(LATr) * Math.tan(DEr)); // angolo orario

  var H1 = Math.acos(
    (Math.cos(Rad(96)) - Math.sin(LATr) * Math.sin(DEr)) /
      (Math.cos(LATr) * Math.cos(DEr)),
  );

  var H = Rda(H); // angolo da radiante a sessadecimale.
  var H1 = Rda(H1); // angolo da radiante a sessadecimale.

  var T = ((H1 - H) / 15) * 0.9973;

  var p_sole = ST_SOLE(njd, longitudine, latitudine, altitudine);

  var crep_m = ore_24(p_sole[2] - T); // crepuscolo del mattino.
  var crep_s = ore_24(p_sole[4] + T); // crepuscolo serale.

  var tempi_crep = new Array(crep_m, crep_s);

  return tempi_crep;
}

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                               FUNZIONE PER IL CALCOLO DEL CREPUSCOLO CIVILE UT                  FINE
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                               FUNZIONE PER IL CALCOLO DEL CREPUSCOLO NAUTICO UT                INIZIO
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function crepuscolo_NA(njd, longitudine, latitudine, altitudine) {
  // funzione per il calcolo del crepuscolo civile per il T.U. di Greenwich
  // aggiornata al 03/12/2011.
  // by Salvatore Ruiu - Irgoli (Italy).
  // IL Sole si trova a -12 gradi sotto l'orizzonte locale. 90+12 .

  var ps_sole = pos_sole(njd);
  var DEs = ps_sole[1]; // declinazione del Sole.

  var LATr = Rad(latitudine); // angolo in radianti.
  var DEr = Rad(DEs); // angolo in radianti.

  var H = Math.acos(-Math.tan(LATr) * Math.tan(DEr)); // angolo orario

  var H1 = Math.acos(
    (Math.cos(Rad(102)) - Math.sin(LATr) * Math.sin(DEr)) /
      (Math.cos(LATr) * Math.cos(DEr)),
  );

  var H = Rda(H); // angolo da radiante a sessadecimale.
  var H1 = Rda(H1); // angolo da radiante a sessadecimale.

  var T = ((H1 - H) / 15) * 0.9973;

  var p_sole = ST_SOLE(njd, longitudine, latitudine, altitudine);

  var crep_m = ore_24(p_sole[2] - T); // crepuscolo del mattino.
  var crep_s = ore_24(p_sole[4] + T); // crepuscolo serale.

  var tempi_crep = new Array(crep_m, crep_s);

  return tempi_crep;
}

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                               FUNZIONE PER IL CALCOLO DEL CREPUSCOLO NAUTICO UT                     FINE
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                                             EFFEMERIDI PIANETI                                     INIZIO
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function pos_pianeti(njd, np) {
  //  by Salvatore Ruiu Irgoli-Sardegna (Italy) novembre 2010
  //  calcola la posizione dei pianeti
  //  njd= numero del giorno giuliano della data in T.U.
  //  np= numero identificativo del pianeta 0,1,2,3,4,5,6,7,8  mercurio,venere... 2 per la Terra
  //  coordinate geocentriche del pianeta riferite all'equinozio della data (njd).
  //  calcola le principali perturbazioni planetarie.

  // new Array(Periodo , Long_media , Anomalia_media , Long_perielio , eccentr , Semiasse , Inclinazione , Long_nodo , dim_ang , magnitudine);
  //              0          1                2            3              4         5            6             7          8          9

  var tempo_luce = t_luce(njd, np);

  njd = njd - tempo_luce; // correzione per il tempo luce.

  var el_orb = orb_plan(njd, np); // recupera gli elementi orbitali del pianeta.

  var periodo = el_orb[0]; //  periodo.
  var L = el_orb[1]; //  longitudine media all'epoca.
  var AM_media = el_orb[2]; //  anomalia media.
  var long_peri = el_orb[3]; //  longitudine del perielio.
  var eccent = el_orb[4]; //  eccentricità dell'orbita.
  var semiasse = el_orb[5]; //  semiasse maggiore.
  var inclinaz = el_orb[6]; //  inclinazione.
  var long_nodo = el_orb[7]; //  longitudine del nodo.
  var dimens = el_orb[8]; //  dimensioni apparenti.
  var magn = el_orb[9]; //  magnitudine.

  var correzioni_orb = pos_pianeticr(njd, np); // calcolo delle correzioni per il pianeta (np).

  //      Array(Delta_LP , Delta_R , Delta_LL , Delta_AS , Delta_EC , Delta_MM , Delta_LAT_ELIO);
  //                 0          1         2          3          4          5          6
  //             lperiodo,    rvett     long.     assemagg     ecc         M         lat

  //  CORREZIONI

  L = L + correzioni_orb[0]; // longitudine media.
  AM_media = AM_media + correzioni_orb[5]; // anomalia media + correzioni..
  semiasse = semiasse + correzioni_orb[3]; // semiasse maggiore.
  eccent = eccent + correzioni_orb[4]; // eccentricità.

  //  LONGITUDINE ELIOCENTRICA DEL PIANETA ***************************************************** inizio:

  var M = AM_media; // anomalia media

  M = gradi_360(M); // intervallo 0-360;

  var E = eq_keplero(M, eccent); // equazione di Keplero.E[0]=Anomalia eccentrica E[1]=Anomalia vera in radianti.

  var rv = semiasse * (1 - eccent * Math.cos(E[0])); // calcolo del raggio vettore (distanza dal Sole).
  rv = rv + correzioni_orb[1]; // raggio vettore più correzione.

  var U = gradi_360(L + Rda(E[1]) - M - long_nodo); //  argomento della latitudine.

  var long_eccliticay = Math.cos(Rad(inclinaz)) * Math.sin(Rad(U));
  var long_eccliticax = Math.cos(Rad(U));

  var long_ecclitica = quadrante(long_eccliticay, long_eccliticax) + long_nodo;
  var l = gradi_360(long_ecclitica);
  l = l + correzioni_orb[2]; // longitudine del pianeta + correzione.

  //  LONGITUDINE ELIOCENTRICA DEL PIANETA ********************************************************* fine:

  var b = Rda(Math.asin(Math.sin(Rad(U)) * Math.sin(Rad(inclinaz)))); // latitudine ecclittica in gradi (b)

  // LONGITUDINE E RAGGIO VETTORE DEL SOLE *** inizio:

  njd = njd + tempo_luce;

  var eff_sole = pos_sole(njd);
  var LS = eff_sole[2]; // longitudine geocentrica del Sole.
  var RS = eff_sole[4]; // raggio vettore.

  // LONGITUDINE E RAGGIO VETTORE DEL SOLE *** fine:

  // longitudine geocentrica.

  var Y = rv * Math.cos(Rad(b)) * Math.sin(Rad(l - LS));
  var X = rv * Math.cos(Rad(b)) * Math.cos(Rad(l - LS)) + RS;

  var long_geo = gradi_360(quadrante(Y, X) + LS); // longitudine geocentrica.

  var dist_p = Y * Y + X * X + rv * Math.sin(Rad(b)) * (rv * Math.sin(Rad(b)));
  dist_p = Math.sqrt(dist_p); // distanza del pianeta dalla Terra.

  var beta = (rv / dist_p) * Math.sin(Rad(b));
  var lat_geo = Rda(Math.asin(beta));
  lat_geo = lat_geo + correzioni_orb[6]; // latitudine + correzione.

  //  fase del pianeta.

  var fase = 0.5 * (1 + Math.cos(Rad(long_geo - long_ecclitica)));
  fase = fase.toFixed(2);

  // parallasse del pianeta in gradi.

  var pa = 8.794 / dist_p / 3600;

  var coo_pl = trasf_ecli_equa(njd, long_geo, lat_geo); // coordinate equatoriali.

  // diametro apparente in secondi d'arco.

  var diam_app = dimens / dist_p;

  // magnitudine del pianeta.

  var magnitudine =
    (5 * Math.log((rv * dist_p) / (magn * Math.sqrt(fase)))) / 2.30258 - 27.7;
  magnitudine = magnitudine.toFixed(1);

  if (magnitudine == Infinity) {
    magnitudine = 'nd';
  }

  var elongaz = elong(coo_pl[0], coo_pl[1], eff_sole[0], eff_sole[1]); //  elongazione in gradi dal Sole.

  //   calcolo dell'angolo di fase in gradi .

  var Dpt = dist_p; // distanza pianeta-terra.
  var Dts = RS; // distanza terra-sole.
  var Dps = rv; // distanza pianeta-sole.

  // teorema del coseno

  var delta_fase = (Dts * Dts + Dps * Dps - Dpt * Dpt) / (2 * Dps * Dts);
  delta_fase = Math.acos(delta_fase);
  delta_fase = Rda(delta_fase);

  var angolo_fase = 180 - Math.abs(elongaz) - delta_fase; // angolo di fase in gradi.

  var dati_pp = new Array(
    coo_pl[0],
    coo_pl[1],
    fase,
    magnitudine,
    dist_p,
    diam_app,
    elongaz,
    LS,
    RS,
    long_ecclitica,
    pa,
    rv,
    angolo_fase,
  );
  //                        0         1       2       3          4       5       6    7  8      9          10 11      12

  //  risultati:    ARetta,Declinazione,fase,magnitudine,distanza pianeta,diametro apparente, elongazione, long. sole,raggio vettore Terra, longituddine elio. pianeta, parallase,dist sole-pianeta.

  return dati_pp;
}

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------
//
//                                              EFFEMERIDI PIANETI                                      FINE
//
// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

//                                FUNZIONE PER IL CALCOLO DELLE EFFEMERIDI DEI PIANETI               -INIZIO

// ---------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------

function effemeridi_pianeti(
  np,
  TEMPO_RIF,
  LAT,
  LON,
  ALT,
  ITERAZIONI,
  STEP,
  LAN,
) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2011
  // funzione per il calcolo delle effemeridi del Sole.
  // Parametri utilizzati
  // np= numero identificativo del pianeta 0=Mercurio,1=Venere.....7=Nettuno
  // il valore np=2 (Terra) non deve essere utilizzato come parametro.
  // TEMPO_RIF= "TL" o "TU"  tempo locale o tempo universale.
  // LAT= latitudine in gradi sessadecimali.
  // LON= longtudine in gradi sessadecimali.
  // ALT= altitudine in metri.
  // ITERAZIONE =numero di ripetizioni del calcolo.
  // STEP=salto
  // LAN="EN" versione in inglese.

  var njd = calcola_jdUT0(); // numero del giorno giuliano all'ora 0 di oggi T.U.

  njd = njd + 0.00078; // correzione per il Terrestrial Time.

  //njd=njd+t_luce(njd,np);       // correzione tempo luce.

  var data_ins = 0; // data
  var data_inser = 0; // data
  var numero_iterazioni = ITERAZIONI;

  var fusoloc = -fuso_loc(); // recupera il fuso orario della località (compresa l'ora legale) e riporta l'ora del pc. come T.U.

  var sorge = 0;
  var trans = 0;
  var tramn = 0;
  var azimuts = 0;
  var azimutt = 0;

  var effe_pianeta = 0;
  var ar_pianeta = 0;
  var de_pianeta = 0;
  var classetab = 'colore_tabellaef1';
  var istanti = 0;
  var magnitudine = 0;
  var fase = 0;
  var diametro = 0;
  var distanza = 0;
  var elongazione = 0;
  var costl = '*'; // nome della costellazione.
  var parallasse = 0;
  var p_ap = 0; // coordinate apparenti del pianeta.

  if (STEP == 0) {
    STEP = 1;
  }

  document.write("<table width=100% class='.table_effemeridi'>");
  document.write('   <tr>');

  //  versione in italiano.

  if (LAN != 'EN') {
    // diverso da EN
    document.write("     <td class='colore_tabella'>Data:</td>");
    document.write("     <td class='colore_tabella'>Sorge:</td>");
    document.write("     <td class='colore_tabella'>Culmina:</td>");
    document.write("     <td class='colore_tabella'>Tramonta:</td>");
    document.write("     <td class='colore_tabella'>A. So.:</td>");
    document.write("     <td class='colore_tabella'>A. Tr.:</td>");
    document.write("     <td class='colore_tabella'>A. Retta:</td>");
    document.write("     <td class='colore_tabella'>Dec.:</td>");
    document.write("     <td class='colore_tabella'>Fase.</td>");
    document.write("     <td class='colore_tabella'>Dist.</td>");
    document.write("     <td class='colore_tabella'>Dia.</td>");
    document.write("     <td class='colore_tabella'>El.</td>");
    document.write("     <td class='colore_tabella'>Ma.</td>");
    document.write("     <td class='colore_tabella'>Cost.</td>");
  }

  //  versione in inglese.

  if (LAN == 'EN') {
    document.write("     <td class='colore_tabella'>Date:</td>");
    document.write("     <td class='colore_tabella'>Rise:</td>");
    document.write("     <td class='colore_tabella'>Transit:</td>");
    document.write("     <td class='colore_tabella'>Set:</td>");
    document.write("     <td class='colore_tabella'>Az. Rise:</td>");
    document.write("     <td class='colore_tabella'>Az. Set:</td>");
    document.write("     <td class='colore_tabella'>R.A.:</td>");
    document.write("     <td class='colore_tabella'>Dec.:</td>");
    document.write("     <td class='colore_tabella'>Ph.</td>");
    document.write("     <td class='colore_tabella'>Dist.</td>");
    document.write("     <td class='colore_tabella'>Dia.</td>");
    document.write("     <td class='colore_tabella'>El.</td>");
    document.write("     <td class='colore_tabella'>Ma.</td>");
    document.write("     <td class='colore_tabella'>Const.</td>");
  }

  document.write('   </tr>');

  // ST_ASTRO_DATA Array(azimut_sorgere,azimut_tramonto,tempo_sorgere,tempo_transito,tempo_tramonto)
  //                           0              1              2             3              4

  njd = njd - STEP;

  for (b = 0; b < numero_iterazioni; b = b + STEP) {
    njd = njd + STEP;
    effe_pianeta = pos_pianeti(njd, np);

    // calcola le coordinate apparenti nutazione e aberrazione.

    p_ap = pos_app(njd, effe_pianeta[0], effe_pianeta[1]);
    ar_pianeta = sc_ore(p_ap[0]); // ascensione retta in hh:mm:ss.
    de_pianeta = sc_angolo(p_ap[1], 0); // declinazione.

    fase = effe_pianeta[2];
    magnitudine = effe_pianeta[3];
    distanza = effe_pianeta[4].toFixed(3);
    diametro = effe_pianeta[5].toFixed(1);
    elongazione = effe_pianeta[6].toFixed(1);
    costl = costell(effe_pianeta[0]); // costellazione.

    istanti = ST_ASTRO_DATA(
      njd,
      effe_pianeta[0],
      effe_pianeta[1],
      LON,
      LAT,
      ALT,
      0,
    );

    if (TEMPO_RIF == 'TL') {
      sorge = ore_24(istanti[2] + fusoloc);
      trans = ore_24(istanti[3] + fusoloc);
      tramn = ore_24(istanti[4] + fusoloc);
    } else {
      sorge = ore_24(istanti[2]);
      trans = ore_24(istanti[3]);
      tramn = ore_24(istanti[4]);
    }

    sorge = sc_ore_hm(sorge); // istanti in hh:mm
    trans = sc_ore_hm(trans);
    tramn = sc_ore_hm(tramn);

    // formatta la data da inserire.

    data_ins = jd_data(njd);

    if (LAN != 'EN') {
      data_inser =
        Lnum(parseInt(data_ins[0]), 2) +
        ':' +
        Lnum(parseInt(data_ins[1]), 2) +
        ' |' +
        data_ins[3];
    } // versione in italiano.
    if (LAN == 'EN') {
      data_inser =
        Lnum(parseInt(data_ins[0]), 2) +
        ':' +
        Lnum(parseInt(data_ins[1]), 2) +
        ' |' +
        data_ins[4];
    } // versione in inglese.

    azimuts = istanti[0].toFixed(1);
    azimutt = istanti[1].toFixed(1);

    if (b % 2 == 0) {
      classetab = 'colore_tabellaef2';
    } else {
      classetab = 'colore_tabellaef1';
    }

    document.write('   <tr>');
    document.write(
      "     <td class='" + classetab + "'>" + data_inser + '</td>',
    );
    document.write("     <td class='" + classetab + "'>" + sorge + '</td>');
    document.write("     <td class='" + classetab + "'>" + trans + '</td>');
    document.write("     <td class='" + classetab + "'>" + tramn + '</td>');
    document.write(
      "     <td class='" + classetab + "'>" + azimuts + '&deg;</td>',
    );
    document.write(
      "     <td class='" + classetab + "'>" + azimutt + '&deg;</td>',
    );
    document.write(
      "     <td class='" + classetab + "'>" + ar_pianeta + '</td>',
    );
    document.write(
      "     <td class='" + classetab + "'>" + de_pianeta + '</td>',
    );
    document.write("     <td class='" + classetab + "'>" + fase + '</td>');
    document.write("     <td class='" + classetab + "'>" + distanza + '</td>');
    document.write("     <td class='" + classetab + "'>" + diametro + '</td>');
    document.write(
      "     <td class='" + classetab + "'>" + elongazione + '</td>',
    );
    document.write(
      "     <td class='" + classetab + "'>" + magnitudine + '</td>',
    );
    document.write("     <td class='" + classetab + "'>" + costl + '</td>');

    document.write('   </tr>');
  }
  document.write(' </table>');
}

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

//                                FUNZIONE PER IL CALCOLO DELLE EFFEMERIDI DEI PIANETI                               FINE

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

function pos_pianeticr(njd, np) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) settembre 2010
  // termini di correzione per i pianeti Giove e Saturno.
  //  np=numero identificativo del pianeta.

  var T = (njd - 2415020.0) / 36525;

  M = 358.47583 + 35999.04975 * T - 0.00015 * T * T - 0.0000033 * T * T * T; // Sole.

  M1 = 102.27938 + 149472.51529 * T + 0.000007 * T * T; // Mercurio.
  M2 = 212.60322 + 58517.80387 * T + 0.001286 * T * T; // Venere.
  M4 = 319.51913 + 19139.85475 * T + 0.000181 * T * T; // Marte.
  M5 = 225.32833 + 3034.69202 * T - 0.000722 * T * T; // Giove.
  M6 = 175.46622 + 1221.55147 * T - 0.000502 * T * T; // Saturno.

  var Delta_LP = 0; // termini correzione di lungo periodo.
  //var  Delta_L=0;        // correzione per la longitudine.
  var Delta_R = 0; // correzione per il raggio vettore.

  var Delta_LL = 0; // correzione per la longitudine.
  var Delta_P = 0; // correzione per il perielio.
  var Delta_AS = 0; // correzione semiasse maggiore.
  var Delta_EC = 0; // correzione eccentricità.
  var Delta_MM = 0; // correzione anomalia media.
  var Delta_LAT_ELIO = 0; // correzione latitudine eliocentrica.

  // Correzioni per Mercurio - Perturbazioni in longitudine.
  // Da aggiungere dopo aver risolto l'E.Keplero

  if (np == 0) {
    // longitudine

    Delta_LL =
      0.00204 * Math.cos(Rad(5 * M2 - 2 * M1 + 12.22)) +
      0.00103 * Math.cos(Rad(2 * M2 - M1 - 160.692)) +
      0.00091 * Math.cos(Rad(2 * M5 - M1 - 37.003)) +
      0.00078 * Math.cos(Rad(5 * M2 - 3 * M1 + 10.137));

    //  perturbazioni in raggio vettore

    Delta_R =
      0.000007525 * Math.cos(Rad(2 * M5 - M1 + 53.013)) +
      0.000006802 * Math.cos(Rad(5 * M2 - 3 * M1 - 259.918)) +
      0.000005457 * Math.cos(Rad(2 * M2 - 2 * M1 - 71.188)) +
      0.000003569 * Math.cos(Rad(5 * M2 - M1 - 77.75));
  }

  // Correzioni per Venere -Perturbazioni in longitudine.
  // Delta_LP da aggiungere alla longitudine e anomalia media prima di aver risolto l'E.Keplero.
  // gli altri 2 termini dopo aver risolto l'E.Keplero.
  else if (np == 1) {
    // longitudine e anomalia media

    Delta_LP = 0.00077 * Math.sin(Rad(237.24 + 150.27 * T));
    Delta_MM = Delta_LP;

    // longitudine

    Delta_LL =
      0.00313 * Math.cos(Rad(2 * M - 2 * M2 - 148.225)) +
      0.00198 * Math.cos(Rad(3 * M - 3 * M2 + 2.565)) +
      0.00136 * Math.cos(Rad(M - M2 - 119.107)) +
      0.00096 * Math.cos(Rad(3 * M - 2 * M2 - 135.912)) +
      0.00082 * Math.cos(Rad(M5 - M2 - 208.087));

    //  perturbazioni in raggio vettore

    Delta_R =
      0.000022501 * Math.cos(Rad(2 * M - 2 * M2 - 58.208)) +
      0.000019045 * Math.cos(Rad(3 * M - 3 * M2 + 92.577)) +
      0.000006887 * Math.cos(Rad(M5 - M2 - 118.09)) +
      0.000005172 * Math.cos(Rad(M - M2 - 29.11)) +
      0.00000362 * Math.cos(Rad(5 * M - 4 * M2 - 104.208)) +
      0.000003283 * Math.cos(Rad(4 * M - 4 * M2 + 63.513)) +
      0.000003074 * Math.cos(Rad(2 * M5 - 2 * M2 - 55.167));
  }

  // Correzioni per la Terra
  else if (np == 2) {
    Delta_LP = 0;

    // correzioni ***************

    var A = 153.23 + 22518.7541 * T;
    var B = 216.57 + 45037.5082 * T;
    var C = 312.69 + 32964.3577 * T;
    var D = 350.74 + 445267.1142 * T - 0.00144 * T * T;
    var E = 231.19 + 20.2 * T;
    var H = 353.4 + 65928.7155 * T;

    // angoli in radianti.

    A = Rad(A);
    B = Rad(B);
    C = Rad(C);
    D = Rad(D);
    E = Rad(E);
    H = Rad(H);

    // correzione per la longitudine.

    var Delta_LL =
      0.00134 * Math.cos(A) +
      0.00154 * Math.cos(B) +
      0.002 * Math.cos(C) +
      0.00179 * Math.sin(D) +
      0.00178 * Math.sin(E);

    // correzioni per il raggio vettore.

    var Delta_R =
      0.00000543 * Math.sin(A) +
      0.00001575 * Math.sin(B) +
      0.00001627 * Math.sin(C) +
      0.00003076 * Math.cos(D) +
      0.00000927 * Math.sin(H);
  }

  // correzioni per il pianeta Marte  ******************************** INIZIO .
  // Delta_LP da aggiungere alla longitudine e anomalia media prima di aver risolto l'E.Keplero.
  // gli altri 2 termini dopo aver risolto l'E.Keplero.

  if (np == 3) {
    // longitudine e anomalia media

    Delta_LP =
      -0.01133 * Math.sin(Rad(3 * M5 - 8 * M4 + 4 * M)) -
      0.00933 * Math.cos(Rad(3 * M5 - 8 * M4 + 4 * M)); // termine lungo periodo.
    Delta_MM = Delta_LP;

    // longitudine

    Delta_LL =
      0.00705 * Math.cos(Rad(M5 - M4 - 48.958)) +
      0.00607 * Math.cos(Rad(2 * M5 - M4 - 118.35)) +
      0.00445 * Math.cos(Rad(2 * M5 - 2 * M4 - 191.897)) +
      0.00388 * Math.cos(Rad(M - 2 * M4 + 20.495)) +
      0.00238 * Math.cos(Rad(M - M4 + 35.097)) +
      0.00204 * Math.cos(Rad(2 * M - 3 * M4 + 158.638)) +
      0.00177 * Math.cos(Rad(3 * M4 - M2 - 57.602)) +
      0.00136 * Math.cos(Rad(2 * M - 4 * M4 + 154.093)) +
      0.00104 * Math.cos(Rad(M5 + 17.618));

    // raggio vettore

    Delta_R =
      0.000053227 * Math.cos(Rad(M5 - M4 + 41.1306)) +
      0.000050989 * Math.cos(Rad(2 * M5 - 2 * M4 - 101.9847)) +
      0.000038278 * Math.cos(Rad(2 * M5 - M4 - 98.3292)) +
      0.000015996 * Math.cos(Rad(M - M4 - 55.555)) +
      0.000014764 * Math.cos(Rad(2 * M - 3 * M4 + 68.622)) +
      0.000008966 * Math.cos(Rad(M5 - 2 * M4 + 43.615)) +
      0.000007914 * Math.cos(Rad(3 * M5 - 2 * M4 - 139.737)) +
      0.000007004 * Math.cos(Rad(2 * M5 - 3 * M4 - 102.888)) +
      0.00000662 * Math.cos(Rad(M - 2 * M4 + 113.202)) +
      0.00000493 * Math.cos(Rad(3 * M5 - 3 * M4 - 76.243)) +
      0.000004693 * Math.cos(Rad(3 * M - 5 * M4 + 190.603)) +
      0.000004571 * Math.cos(Rad(2 * M - 4 * M4 + 244.702)) +
      0.000004409 * Math.cos(Rad(3 * M5 - M4 - 115.828));
  }

  // correzioni per il pianeta Marte  ******************************** FINE.

  // correzioni per il pianeta Giove ******************************* INIZIO.
  // tutti i termini di Giove sono da aggiungere prima dell'equazione di Keplero

  if (np == 4) {
    var X = T / 5 + 0.1;
    var P = 237.47555 + 3034.9061 * T;
    var Q = 265.9165 + 1222.1139 * T;
    var S = 243.51721 + 428.4677 * T;
    var V = 5 * Q - 2 * P;
    var W = 2 * P - 6 * Q + 3 * S;
    var Z = Q - P;

    // ************************* A
    // correzione per la longitudine media da aggiungere prima dell'equazione di Keplero
    // solo per la longitudine media.

    Delta_LL =
      (0.331364 - 0.010281 * X - 0.004692 * X * X) * Math.sin(Rad(V)) +
      (0.003228 - 0.064436 * X + 0.002075 * X * X) * Math.cos(Rad(V)) -
      (0.003083 + 0.000275 * X - 0.000489 * X * X) * Math.sin(Rad(2 * V)) +
      0.002472 * Math.sin(Rad(W)) +
      0.013619 * Math.sin(Rad(Z)) +
      0.018472 * Math.sin(Rad(2 * Z)) +
      0.006717 * Math.sin(Rad(3 * Z)) +
      0.002775 * Math.sin(Rad(4 * Z)) +
      (0.007275 - 0.001253 * X) * Math.sin(Rad(Z)) * Math.sin(Rad(Q)) +
      0.006417 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(Q)) +
      0.002439 * Math.sin(Rad(3 * Z)) * Math.sin(Rad(Q)) -
      (0.033839 + 0.001125 * X) * Math.cos(Rad(Z)) * Math.sin(Rad(Q)) -
      0.003767 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(Q)) -
      (0.035681 + 0.001208 * X) * Math.sin(Rad(Z)) * Math.cos(Rad(Q)) -
      0.004261 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(Q)) +
      0.002178 * Math.cos(Rad(Q)) +
      (-0.006333 + 0.001161 * X) * Math.cos(Rad(Z)) * Math.cos(Rad(Q)) -
      0.006675 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(Q)) -
      0.002664 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(Q)) -
      0.002572 * Math.sin(Rad(Z)) * Math.sin(Rad(2 * Q)) -
      0.003567 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      0.002094 * Math.cos(Rad(Z)) * Math.cos(Rad(2 * Q)) +
      0.003342 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(2 * Q));

    // correzione per l'anomalia media -- più in fondo nel listato.

    // perturbazioni perielio da utilizzare per calcolare M. (vedi in fondo nel listato)

    Delta_P =
      (0.007192 - 0.003147 * X) * Math.sin(Rad(V)) +
      (-0.020428 - 0.000675 * X + 0.000197 * X * X) * Math.cos(Rad(V)) +
      (0.007269 + 0.000672 * X) * Math.sin(Rad(Z)) * Math.sin(Rad(Q)) -
      0.004344 * Math.sin(Rad(Q)) +
      0.034036 * Math.cos(Rad(Z)) * Math.sin(Rad(Q)) +
      0.005614 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(Q)) +
      0.002964 * Math.cos(Rad(3 * Z)) * Math.sin(Rad(Q)) +
      0.037761 * Math.sin(Rad(Z)) * Math.cos(Rad(Q)) +
      0.006158 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(Q)) -
      0.006603 * Math.cos(Rad(Z)) * Math.cos(Rad(Q)) -
      0.005356 * Math.sin(Rad(Z)) * Math.sin(Rad(2 * Q)) +
      0.002722 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      0.004483 * Math.cos(Rad(Z)) * Math.sin(Rad(2 * Q)) -
      0.002642 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      0.004403 * Math.sin(Rad(Z)) * Math.cos(Rad(2 * Q)) -
      0.002536 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) +
      0.005547 * Math.cos(Rad(Z)) * Math.cos(Rad(2 * Q)) -
      0.002689 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(2 * Q));

    // correzione per l'anomalia media da aggiungere prima dell'equazione di Keplero

    var el_orb = orb_plan(njd, 4); // recupera l'eccentricità del pianeta.
    var eccent = el_orb[4]; // eccentricità non corretta.

    Delta_MM = Delta_LL - Delta_P / eccent;

    // semiasse maggiore da aggiungere prima dell'equazione di Keplero.

    Delta_AS =
      -263 * Math.cos(Rad(V)) +
      205 * Math.cos(Rad(Z)) +
      693 * Math.cos(Rad(2 * Z)) +
      312 * Math.cos(Rad(3 * Z)) +
      147 * Math.cos(Rad(4 * Z)) +
      299 * Math.sin(Rad(Z)) * Math.sin(Rad(Q)) +
      181 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(Q)) +
      204 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(Q)) +
      111 * Math.sin(Rad(3 * Z)) * Math.cos(Rad(Q)) -
      337 * Math.cos(Rad(Z)) * Math.cos(Rad(Q)) -
      111 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(Q));

    Delta_AS = Delta_AS / 1000000;

    // eccentricità da aggiungere prima dell'equazione di Keplero

    Delta_EC =
      (3606 + 130 * X - 43 * X * X) * Math.sin(Rad(V)) +
      (1289 - 580 * X) * Math.cos(Rad(V)) -
      6764 * Math.sin(Rad(Z)) * Math.sin(Rad(Q)) -
      1110 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(Q)) -
      224 * Math.sin(Rad(3 * Z)) * Math.sin(Rad(Q)) -
      204 * Math.sin(Rad(Q)) +
      (1284 + 116 * X) * Math.cos(Rad(Z)) * Math.sin(Rad(Q)) +
      188 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(Q)) +
      (1460 + 130 * X) * Math.sin(Rad(Z)) * Math.cos(Rad(Q)) +
      224 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(Q)) -
      817 * Math.cos(Rad(Q)) +
      6074 * Math.cos(Rad(Z)) * Math.cos(Rad(Q)) +
      992 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(Q)) +
      508 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(Q)) +
      230 * Math.cos(Rad(4 * Z)) * Math.cos(Rad(Q)) +
      108 * Math.cos(Rad(5 * Z)) * Math.cos(Rad(Q)) -
      (956 + 73 * X) * Math.sin(Rad(Z)) * Math.sin(Rad(2 * Q)) +
      448 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      137 * Math.sin(Rad(3 * Z)) * Math.sin(Rad(2 * Q)) +
      (-997 + 108 * X) * Math.cos(Rad(Z)) * Math.sin(Rad(2 * Q)) +
      480 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      148 * Math.cos(Rad(3 * Z)) * Math.sin(Rad(2 * Q)) +
      (-956 + 99 * X) * Math.sin(Rad(Z)) * Math.cos(Rad(2 * Q)) +
      490 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) +
      158 * Math.sin(Rad(3 * Z)) * Math.cos(Rad(2 * Q)) +
      179 * Math.cos(Rad(2 * Q)) +
      (1024 + 75 * X) * Math.cos(Rad(Z)) * Math.cos(Rad(2 * Q)) -
      437 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) -
      132 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(2 * Q));

    Delta_EC = Delta_EC / 10000000;
  }

  // correzioni per il pianeta Giove ********************************* FINE.

  // correzioni per il pianeta Saturno ****************************** INIZIO.
  // tutti i termini di Saturno sono da aggiungere prima dell'equazione di Keplero
  // tranne il termine della latitudine eliocentrica

  if (np == 5) {
    var X = T / 5 + 0.1;
    var P = 237.47555 + 3034.9061 * T;
    var Q = 265.9165 + 1222.1139 * T;
    var S = 243.51721 + 428.4677 * T;
    var V = 5 * Q - 2 * P;
    var W = 2 * P - 6 * Q + 3 * S;
    var Z = Q - P;
    var PS = S - Q;

    // perturbazioni in longitudine media

    Delta_LL =
      +(-0.814181 + 0.01815 * X + 0.016714 * X * X) * Math.sin(Rad(V)) +
      (-0.010497 + 0.160906 * X - 0.0041 * X * X) * Math.cos(Rad(V)) +
      0.007581 * Math.sin(Rad(2 * V)) -
      0.007986 * Math.sin(Rad(W)) -
      0.148811 * Math.sin(Rad(Z)) -
      0.040786 * Math.sin(Rad(2 * Z)) -
      0.015208 * Math.sin(Rad(3 * Z)) -
      0.006339 * Math.sin(Rad(4 * Z)) -
      0.006244 * Math.sin(Rad(Q)) +
      (0.008931 + 0.002728 * X) * Math.sin(Rad(Z)) * Math.sin(Rad(Q)) -
      0.0165 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(Q)) -
      0.005775 * Math.sin(Rad(3 * Z)) * Math.sin(Rad(Q)) +
      (0.081344 + 0.003206 * X) * Math.cos(Rad(Z)) * Math.sin(Rad(Q)) +
      0.015019 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(Q)) +
      (0.085581 + 0.002494 * X) * Math.sin(Rad(Z)) * Math.cos(Rad(Q)) +
      (0.025328 - 0.003117 * X) * Math.cos(Rad(Z)) * Math.cos(Rad(Q)) +
      0.014394 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(Q)) +
      0.006319 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(Q)) +
      0.006369 * Math.sin(Rad(Z)) * Math.sin(Rad(2 * Q)) +
      0.009156 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      0.007525 * Math.sin(Rad(3 * PS)) * Math.sin(Rad(2 * Q)) -
      0.005236 * Math.cos(Rad(Z)) * Math.cos(Rad(2 * Q)) -
      0.007736 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) -
      0.007528 * Math.cos(Rad(3 * PS)) * Math.cos(Rad(2 * Q));

    // eccentricità

    Delta_EC =
      +(-7927 + 2548 * X + 91 * X * X) * Math.sin(Rad(V)) +
      (13381 + 1226 * X - 253 * X * X) * Math.cos(Rad(V)) +
      (248 - 121 * X) * Math.sin(Rad(2 * V)) -
      (305 + 91 * X) * Math.cos(Rad(2 * V)) +
      412 * Math.sin(Rad(Z)) +
      12415 * Math.sin(Rad(Q)) +
      (390 - 617 * X) * Math.sin(Rad(Z)) * Math.sin(Rad(Q)) +
      (165 - 204 * X) * Math.sin(Rad(2 * Z)) * Math.sin(Rad(Q)) +
      26599 * Math.cos(Rad(Z)) * Math.sin(Rad(Q)) -
      4687 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(Q)) -
      1870 * Math.cos(Rad(3 * Z)) * Math.sin(Rad(Q)) -
      821 * Math.cos(Rad(4 * Z)) * Math.sin(Rad(Q)) -
      377 * Math.cos(Rad(5 * Z)) * Math.sin(Rad(Q)) +
      497 * Math.cos(Rad(2 * PS)) * Math.sin(Rad(Q)) +
      (163 - 611 * X) * Math.cos(Rad(Q)) -
      12696 * Math.sin(Rad(Z)) * Math.cos(Rad(Q)) -
      4200 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(Q)) -
      1503 * Math.sin(Rad(3 * Z)) * Math.cos(Rad(Q)) -
      619 * Math.sin(Rad(4 * Z)) * Math.cos(Rad(Q)) -
      268 * Math.sin(Rad(5 * Z)) * Math.cos(Rad(Q)) -
      (282 + 1306 * X) * Math.cos(Rad(Z)) * Math.cos(Rad(Q)) +
      (-86 + 230 * X) * Math.cos(Rad(2 * Z)) * Math.cos(Rad(Q)) +
      461 * Math.sin(Rad(2 * PS)) * Math.cos(Rad(Q)) -
      350 * Math.sin(Rad(2 * Q)) +
      (2211 - 286 * X) * Math.sin(Rad(Z)) * Math.sin(Rad(2 * Q)) -
      2208 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) -
      568 * Math.sin(Rad(3 * Z)) * Math.sin(Rad(2 * Q)) -
      346 * Math.sin(Rad(4 * Z)) * Math.sin(Rad(2 * Q)) -
      (2780 + 222 * X) * Math.cos(Rad(Z)) * Math.sin(Rad(2 * Q)) +
      (2022 + 263 * X) * Math.cos(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      248 * Math.cos(Rad(3 * Z)) * Math.sin(Rad(2 * Q)) +
      242 * Math.sin(Rad(3 * PS)) * Math.sin(Rad(2 * Q)) +
      467 * Math.cos(Rad(3 * PS)) * Math.sin(Rad(2 * Q)) -
      490 * Math.cos(Rad(2 * Q)) -
      (2842 + 279 * X) * Math.sin(Rad(Z)) * Math.cos(Rad(2 * Q)) +
      (128 + 226 * X) * Math.sin(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) +
      224 * Math.sin(Rad(3 * Z)) * Math.cos(Rad(2 * Q)) +
      (-1594 + 282 * X) * Math.cos(Rad(Z)) * Math.cos(Rad(2 * Q)) +
      (2162 - 207 * X) * Math.cos(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) +
      561 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(2 * Q)) +
      343 * Math.cos(Rad(4 * Z)) * Math.cos(Rad(2 * Q)) +
      469 * Math.sin(Rad(3 * PS)) * Math.cos(Rad(2 * Q)) -
      242 * Math.cos(Rad(3 * PS)) * Math.cos(Rad(2 * Q)) -
      205 * Math.sin(Rad(Z)) * Math.sin(Rad(3 * Q)) +
      262 * Math.sin(Rad(3 * Z)) * Math.sin(Rad(3 * Q)) +
      208 * Math.cos(Rad(Z)) * Math.cos(Rad(3 * Q)) -
      271 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(3 * Q)) -
      382 * Math.cos(Rad(3 * Z)) * Math.sin(Rad(4 * Q)) -
      376 * Math.sin(Rad(3 * Z)) * Math.cos(Rad(4 * Q));

    Delta_EC = Delta_EC / 10000000;

    // correzione del perielio

    Delta_P =
      +(0.077108 + 0.007186 * X - 0.001533 * X * X) * Math.sin(Rad(V)) +
      (0.045803 - 0.014766 * X - 0.000536 * X * X) * Math.cos(Rad(V)) -
      0.007075 * Math.sin(Rad(Z)) -
      0.075825 * Math.sin(Rad(Z)) * Math.sin(Rad(Q)) -
      0.024839 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(Q)) -
      0.008631 * Math.sin(Rad(3 * Z)) * Math.sin(Rad(Q)) -
      0.072586 * Math.cos(Rad(Q)) -
      0.150383 * Math.cos(Rad(Z)) * Math.cos(Rad(Q)) +
      0.026897 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(Q)) +
      0.010053 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(Q)) -
      (0.013597 + 0.001719 * X) * Math.sin(Rad(Z)) * Math.sin(Rad(2 * Q)) +
      (-0.007742 + 0.001517 * X) * Math.cos(Rad(Z)) * Math.sin(Rad(2 * Q)) +
      (0.013586 - 0.001375 * X) * Math.cos(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      (-0.013667 + 0.001239 * X) * Math.sin(Rad(Z)) * Math.cos(Rad(2 * Q)) +
      0.011981 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) +
      (0.014861 + 0.001136 * X) * Math.cos(Rad(Z)) * Math.cos(Rad(2 * Q)) -
      (0.013064 + 0.001628 * X) * Math.cos(Rad(2 * Z)) * Math.cos(Rad(2 * Q));

    // correzione per l'anomalia media da aggiungere prima dell'equazione di Keplero

    var el_orb = orb_plan(njd, 5); // recupera l'eccentricità del pianeta.
    var eccent = el_orb[4]; // eccentricità senza correzione.

    Delta_MM = Delta_LL - Delta_P / eccent;

    // semiasse maggiore.

    Delta_AS =
      572 * X * Math.sin(Rad(V)) +
      2933 * Math.cos(Rad(V)) +
      33629 * Math.cos(Rad(Z)) -
      3081 * Math.cos(Rad(2 * Z)) -
      1423 * Math.cos(Rad(3 * Z)) -
      671 * Math.cos(Rad(4 * Z)) -
      320 * Math.cos(Rad(5 * Z)) +
      1098 * Math.sin(Rad(Q)) -
      2812 * Math.sin(Rad(Z)) * Math.sin(Rad(Q)) +
      688 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(Q)) -
      393 * Math.sin(Rad(3 * Z)) * Math.sin(Rad(Q)) -
      228 * Math.sin(Rad(4 * Z)) * Math.sin(Rad(Q)) +
      2138 * Math.cos(Rad(Z)) * Math.sin(Rad(Q)) -
      999 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(Q)) -
      642 * Math.cos(Rad(3 * Z)) * Math.sin(Rad(Q)) -
      325 * Math.cos(Rad(4 * Z)) * Math.sin(Rad(Q)) -
      890 * Math.cos(Rad(Q)) +
      2206 * Math.sin(Rad(Z)) * Math.cos(Rad(Q)) -
      1590 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(Q)) -
      647 * Math.sin(Rad(3 * Z)) * Math.cos(Rad(Q)) -
      344 * Math.sin(Rad(4 * Z)) * Math.cos(Rad(Q)) +
      2885 * Math.cos(Rad(Z)) * Math.cos(Rad(Q)) +
      (2172 + 102 * X) * Math.cos(Rad(2 * Z)) * Math.cos(Rad(Q)) +
      296 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(Q)) -
      267 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) -
      778 * Math.cos(Rad(Z)) * Math.sin(Rad(2 * Q)) +
      495 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      250 * Math.cos(Rad(3 * Z)) * Math.sin(Rad(2 * Q)) -
      856 * Math.sin(Rad(Z)) * Math.cos(Rad(2 * Q)) +
      441 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) +
      296 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) +
      211 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(2 * Q)) -
      427 * Math.sin(Rad(Z)) * Math.sin(Rad(3 * Q)) +
      398 * Math.sin(Rad(3 * Z)) * Math.sin(Rad(3 * Q)) +
      344 * Math.cos(Rad(Z)) * Math.cos(Rad(3 * Q)) -
      427 * Math.cos(Rad(3 * Z)) * Math.cos(Rad(3 * Q));

    Delta_AS = Delta_AS / 1000000;

    // aggiungere alla latitudine eliocentrica.

    Delta_LAT_ELIO =
      +0.000747 * Math.cos(Rad(Z)) * Math.sin(Rad(Q)) +
      0.001069 * Math.cos(Rad(Z)) * Math.cos(Rad(Q)) +
      0.002108 * Math.sin(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      0.001261 * Math.cos(Rad(2 * Z)) * Math.sin(Rad(2 * Q)) +
      0.001236 * Math.sin(Rad(2 * Z)) * Math.cos(Rad(2 * Q)) -
      0.002075 * Math.cos(Rad(2 * Z)) * Math.cos(Rad(2 * Q));
  }

  // correzioni per il pianeta Saturno******************************** FINE.

  // correzioni per il pianeta Urano******************************** INIZIO.

  if (np == 6) {
    var X = T / 5 + 0.1;
    var P = 237.47555 + 3034.9061 * T;
    var Q = 265.9165 + 1222.1139 * T;
    var S = 243.51721 + 428.4677 * T;
    var W = 2 * P - 6 * Q + 3 * S;
    var G = 83.76922 + 218.4901 * T;
    var H = 2 * G - S;
    var Z = S - P;
    var N = S - Q;
    var OM = G - S;

    // perturbazioni in longitudine media A

    Delta_LP =
      +(0.864319 - 0.001583 * X) * Math.sin(Rad(H)) +
      (0.082222 - 0.006833 * X) * Math.cos(Rad(H)) +
      0.036017 * Math.sin(Rad(2 * H)) -
      0.003019 * Math.cos(Rad(2 * H)) +
      0.008122 * Math.sin(Rad(W));

    var B =
      0.120303 * Math.sin(Rad(H)) +
      (0.019472 - 0.000947 * X) * Math.cos(Rad(H)) +
      0.006197 * Math.sin(Rad(2 * H));

    // correzione per l'anomalia media di Urano

    var el_orb = orb_plan(njd, 6); // recupera l'eccentricità del pianeta.
    var eccent = el_orb[4]; // eccentricità senza correzione.

    Delta_MM = Delta_LP - B / eccent;

    // eccentricità

    Delta_EC =
      +(-3349 + 163 * X) * Math.sin(Rad(H)) +
      20981 * Math.cos(Rad(H)) +
      1311 * Math.cos(Rad(2 * H));

    Delta_EC = Delta_EC / 10000000;

    // correzione semiasse maggiore.

    Delta_AS = -0.003825 * Math.cos(Rad(H));

    // correzione per la longitudine vera.

    Delta_LL =
      +(0.010122 - 0.000988 * X) * Math.sin(Rad(S + N)) +
      (-0.038581 + 0.002031 * X - 0.00191 * X * X) * Math.cos(Rad(S + N)) +
      (0.034964 - 0.001038 * X + 0.000868 * X * X) * Math.cos(Rad(2 * S + N)) +
      0.005594 * Math.sin(Rad(S + 3 * OM)) -
      0.014808 * Math.sin(Rad(Z)) -
      0.005794 * Math.sin(Rad(N)) +
      0.002347 * Math.cos(Rad(N)) +
      0.009872 * Math.sin(Rad(OM)) +
      0.008803 * Math.sin(Rad(2 * OM)) -
      0.004308 * Math.sin(Rad(3 * OM));

    // aggiungere alla latitudine eliocentrica.

    Delta_LAT_ELIO =
      +(
        0.000458 * Math.sin(Rad(N)) -
        0.000642 * Math.cos(Rad(N)) -
        0.000517 * Math.cos(Rad(4 * OM))
      ) *
        Math.sin(Rad(S)) -
      (0.000347 * Math.sin(Rad(N)) +
        0.000853 * Math.cos(Rad(N)) +
        0.000517 * Math.sin(Rad(4 * N))) *
        Math.cos(Rad(S)) +
      0.000403 *
        (Math.cos(Rad(2 * OM)) * Math.sin(Rad(2 * S)) +
          Math.sin(Rad(2 * OM)) * Math.cos(Rad(2 * S)));

    // correzione al raggio vettore.

    Delta_R =
      -25948 +
      (5795 * Math.cos(Rad(S)) -
        1165 * Math.sin(Rad(S)) +
        1388 * Math.cos(Rad(2 * S))) *
        Math.sin(Rad(N)) +
      4985 * Math.cos(Rad(Z)) +
      (1351 * Math.cos(Rad(S)) +
        5702 * Math.sin(Rad(S)) +
        1388 * Math.sin(Rad(2 * S))) *
        Math.cos(Rad(N)) -
      1230 * Math.cos(Rad(S)) +
      904 * Math.cos(Rad(2 * OM)) +
      3354 * Math.cos(Rad(N)) +
      894 * (Math.cos(Rad(OM)) - Math.cos(Rad(3 * OM)));

    Delta_R = Delta_R / 1000000;
  }
  // correzioni per il pianeta Urano ************************************ FINE.

  // correzioni per il pianeta Nettuno ******************************** INIZIO.

  if (np == 7) {
    var X = T / 5 + 0.1;
    var P = 237.47555 + 3034.9061 * T;
    var Q = 265.9165 + 1222.1139 * T;
    var S = 243.51721 + 428.4677 * T;
    var W = 2 * P - 6 * Q + 3 * S;
    var G = 83.76922 + 218.4901 * T;
    var H = 2 * G - S;
    var Z = G - P;
    var N = G - Q;
    var OM = G - S;

    // perturbazioni in longitudine media A

    Delta_LP =
      +(-0.589833 + 0.001089 * X) * Math.sin(Rad(H)) +
      (-0.056094 + 0.004658 * X) * Math.cos(Rad(H)) -
      0.024286 * Math.sin(Rad(2 * H));

    var B =
      0.024039 * Math.sin(Rad(H)) -
      0.025303 * Math.cos(Rad(H)) +
      0.006206 * Math.sin(Rad(2 * H)) -
      0.005992 * Math.cos(Rad(2 * H));

    // correzione per l'anomalia media di Urano

    var el_orb = orb_plan(njd, 7); // recupera l'eccentricità del pianeta.
    var eccent = el_orb[4]; // eccentricità senza correzione.

    Delta_MM = Delta_LP - B / eccent;

    // eccentricità

    Delta_EC =
      +4389 * Math.sin(Rad(H)) +
      4262 * Math.cos(Rad(H)) +
      1129 * Math.sin(Rad(2 * H)) +
      1089 * Math.cos(Rad(2 * H));

    Delta_EC = Delta_EC / 10000000;

    // correzione semiasse maggiore.

    Delta_AS =
      -817 * Math.sin(Rad(H)) +
      8189 * Math.cos(Rad(H)) +
      781 * Math.cos(Rad(2 * H));

    Delta_AS = Delta_AS / 1000000;

    // correzione per la longitudine vera.

    Delta_LL =
      -0.009556 * Math.sin(Rad(Z)) -
      0.005178 * Math.sin(Rad(N)) +
      0.002572 * Math.sin(Rad(2 * OM)) -
      0.002972 * Math.cos(Rad(2 * OM)) * Math.sin(Rad(G)) -
      0.002833 * Math.sin(Rad(2 * OM)) * Math.cos(Rad(G));

    // aggiungere alla latitudine eliocentrica.

    Delta_LAT_ELIO =
      +0.000336 * Math.cos(Rad(2 * OM)) * Math.sin(Rad(G)) +
      0.000364 * Math.sin(Rad(2 * OM)) * Math.cos(Rad(G));

    // correzione al raggio vettore.

    Delta_R =
      -40596 +
      4992 * Math.cos(Rad(Z)) +
      2744 * Math.cos(Rad(N)) +
      2044 * Math.cos(Rad(OM)) +
      1051 * Math.cos(Rad(2 * OM));

    Delta_R = Delta_R / 1000000;
  }
  // correzioni per il pianeta Nettuno ******************************** FINE

  //  variabili  correzioni
  //                           lperiodo, rvett   long.   assemagg  ecc       M          lat
  var correzioni = new Array(
    Delta_LP,
    Delta_R,
    Delta_LL,
    Delta_AS,
    Delta_EC,
    Delta_MM,
    Delta_LAT_ELIO,
  );

  return correzioni;
}

function costell(ar) {
  // individua la costellazione da inserire nella tabella delle effemeridi.

  cost = '*';

  if (ar > 1.77 && ar < 3.38) {
    cost = 'Ari';
  } else if (ar > 3.38 && ar < 6.02) {
    cost = 'Tau';
  } else if (ar > 6.02 && ar < 8.02) {
    cost = 'Gem';
  } else if (ar > 8.02 && ar < 9.35) {
    cost = 'Cnc';
  } else if (ar > 9.35 && ar < 11.6) {
    cost = 'Leo';
  } else if (ar > 11.6 && ar < 14.4) {
    cost = 'Vir';
  } else if (ar > 14.4 && ar < 16.0) {
    cost = 'Lib';
  } else if (ar > 16.0 && ar < 16.4) {
    cost = 'Sco';
  } else if (ar > 16.4 && ar < 17.7) {
    cost = 'Oph';
  } else if (ar > 17.7 && ar < 20.1) {
    cost = 'Sgr';
  } else if (ar > 20.1 && ar < 21.9) {
    cost = 'Cap';
  } else if (ar > 21.9 && ar < 23.5) {
    cost = 'Aqr';
  } else if (ar > 23.5 && ar < 24.0) {
    cost = 'Psc';
  } else if (ar > 0.0 && ar < 1.77) {
    cost = 'Psc';
  }

  return cost;
}

function costell2(ar) {
  // individua la costellazione da inserire nella tabella delle effemeridi.

  cost = '*';

  if (ar > 1.77 && ar < 3.38) {
    cost = 'Aries ';
  } else if (ar > 3.38 && ar < 6.02) {
    cost = 'Taurus';
  } else if (ar > 6.02 && ar < 8.02) {
    cost = 'Gemini';
  } else if (ar > 8.02 && ar < 9.35) {
    cost = 'Cancer';
  } else if (ar > 9.35 && ar < 11.6) {
    cost = 'Leo';
  } else if (ar > 11.6 && ar < 14.4) {
    cost = 'Virgo';
  } else if (ar > 14.4 && ar < 16.0) {
    cost = 'Libra';
  } else if (ar > 16.0 && ar < 16.4) {
    cost = 'Scorpius';
  } else if (ar > 16.4 && ar < 17.7) {
    cost = 'Ophiucus';
  } else if (ar > 17.7 && ar < 20.1) {
    cost = 'Sagittarius';
  } else if (ar > 20.1 && ar < 21.9) {
    cost = 'Capricornus';
  } else if (ar > 21.9 && ar < 23.5) {
    cost = 'Aquarius';
  } else if (ar > 23.5 && ar < 24.0) {
    cost = 'Pisces ';
  } else if (ar > 0.0 && ar < 1.77) {
    cost = 'Pisces ';
  }

  return cost;
}

// ELEMENTI ORBITALI DEI PIANETI PER L'EQUINOZIO MEDIO DELLA DATA.

function orb_plan(njd, np) {
  // elementi orbitali dei pianeti per l'equinozio della data.

  var T = (njd - 2415020.0) / 36525;

  var L = new Array(); // Longitudine media dei pianeti.

  L[0] = 178.179078 + 149474.07078 * T + 0.0003011 * T * T; // Mercurio.
  L[1] = 342.767053 + 58519.21191 * T + 0.0003097 * T * T; // Venere.
  L[2] = 99.69668 + 36000.76892 * T + 0.0003025 * T * T; // Terra.
  L[3] = 293.737334 + 19141.69551 * T + 0.0003107 * T * T; // Marte.
  L[4] =
    238.049257 + 3036.301986 * T + 0.0003347 * T * T - 0.00000165 * T * T * T; // Giove.
  L[5] =
    266.564377 + 1223.509884 * T + 0.0003245 * T * T - 0.0000058 * T * T * T; // Saturno.
  L[6] = 244.19747 + 429.863546 * T + 0.000316 * T * T - 0.0000006 * T * T * T; // Urano.
  L[7] = 84.457994 + 219.885914 * T + 0.0003205 * T * T - 0.0000006 * T * T * T; // Nettuno.
  L[8] = 93.48 + 144.96 * T; // Plutone.

  var M = new Array(); // Anomalia media dei pianeti.

  M[0] = 102.27938 + 149472.51529 * T + 0.000007 * T * T; // Mercurio.
  M[1] = 212.60322 + 58517.80387 * T + 0.001286 * T * T; // Venere.
  M[2] = 178.47583 + 35999.04975 * T - 0.00015 * T * T - 0.0000033 * T * T * T; // Terra.
  M[3] = 319.51913 + 19139.85475 * T + 0.000181 * T * T; // Marte.
  M[4] = 225.32829 + 3034.69202 * T - 0.000722 * T * T; // Giove.
  M[5] = 175.46616 + 1221.55147 * T - 0.000502 * T * T; // Saturno.
  M[6] = 72.64878 + 428.37911 * T + 0.000079 * T * T; // Urano.
  M[7] = 37.73063 + 218.46134 * T - 0.00007 * T * T; // Nettuno.
  M[8] = 0; // Plutone.

  var a = new Array(
    0.3870986,
    0.7233316,
    0.999996,
    1.5236883,
    5.202561,
    9.554747,
    19.21814,
    30.10957,
    39.48168677,
  ); //
  var p = new Array(
    0.24085,
    0.61521,
    1.00004,
    1.88089,
    11.86224,
    29.45771,
    84.01247,
    164.79558,
    248.09,
  );
  var m = new Array(
    0.000001918,
    0.00001721,
    0.0,
    0.000004539,
    0.0001994,
    0.000174,
    0.00007768,
    0.00007597,
    0.000004073,
  );
  var d = new Array(6.74, 16.92, 0, 9.36, 196.74, 165.6, 65.8, 62.2, 3.2);

  var e = new Array(); // Eccentricità delle orbite planetarie.

  e[0] = 0.20561421 + 0.00002046 * T - 0.00000003 * T * T; // Mercurio.
  e[1] = 0.00682069 - 0.00004774 * T + 0.000000091 * T * T; // Venere.
  e[2] = 0.01675104 - 0.0000418 * T - 0.000000126 * T * T; // Terra.
  e[3] = 0.0933129 + 0.000092064 * T - 0.000000077 * T * T; // Marte.
  e[4] =
    0.04833475 +
    0.00016418 * T -
    0.0000004676 * T * T -
    0.0000000017 * T * T * T; // Giove.
  e[5] =
    0.05589232 -
    0.0003455 * T -
    0.000000728 * T * T +
    0.00000000074 * T * T * T; // Saturno.
  e[6] = 0.0463444 - 0.00002658 * T + 0.000000077 * T * T; // Urano.
  e[7] = 0.00899704 + 0.00000633 * T - 0.000000002 * T * T; // Nettuno.
  e[8] = 0.24880766; // Plutone.

  var i = new Array(); // Inclinazione dell'orbita

  i[0] = 7.002881 + 0.0018608 * T - 0.0000183 * T * T;
  i[1] = 3.393631 + 0.0010058 * T - 0.000001 * T * T;
  i[2] = 0;
  i[3] = 1.850333 - 0.000675 * T + 0.0000126 * T * T;
  i[4] = 1.308736 - 0.0056961 * T + 0.0000039 * T * T;
  i[5] = 2.492519 - 0.0039189 * T - 0.00001549 * T * T + 0.00000004 * T * T * T;
  i[6] = 0.772464 + 0.0006253 * T + 0.0000395 * T * T;
  i[7] = 1.779242 - 0.0095436 * T - 0.0000091 * T * T;
  i[8] = 17.14175;

  var ap = new Array(); // Argomento del perielio.

  ap[0] = 28.753753 + 0.3702806 * T + 0.0001208 * T * T; // Mercurio
  ap[1] = 54.384186 + 0.5081861 * T - 0.0013864 * T * T;
  ap[2] = gradi_360(L[2] - M[2] + 180); // Terra
  ap[3] =
    285.431761 + 1.0697667 * T + 0.0001313 * T * T + 0.00000414 * T * T * T;
  ap[4] =
    273.277558 + 0.5994317 * T + 0.00070405 * T * T + 0.00000508 * T * T * T;
  ap[5] =
    338.3078 + 1.0852207 * T + 0.00097854 * T * T + 0.00000992 * T * T * T;
  ap[6] = 98.071581 + 0.985765 * T - 0.0010745 * T * T - 0.00000061 * T * T * T;
  ap[7] =
    276.045975 + 0.3256394 * T + 0.00014095 * T * T + 0.000004113 * T * T * T;
  ap[8] = 113.76329; // Plutone

  var nd = new Array(); // Longitudine del nodo.

  nd[0] = 47.145944 + 1.1852083 * T + 0.0001739 * T * T; // Mercurio.
  nd[1] = 75.779647 + 0.89985 * T + 0.00041 * T * T; // Venere.
  nd[2] = 0; // Terra
  nd[3] =
    48.786442 + 0.7709917 * T - 0.0000014 * T * T - 0.00000533 * T * T * T; // Marte.
  nd[4] = 99.443414 + 1.01053 * T + 0.00035222 * T * T - 0.00000851 * T * T * T; // Giove.
  nd[5] =
    112.790414 + 0.8731951 * T - 0.00015218 * T * T - 0.00000531 * T * T * T; // Saturno.
  nd[6] = 73.477111 + 0.4986678 * T + 0.0013117 * T * T; // Urano.
  nd[7] =
    130.681389 + 1.098935 * T + 0.00024987 * T * T - 0.000004718 * T * T * T; // Nettuno.
  nd[8] = 110.30347; // Plutone.

  var Long_media = gradi_360(L[np]);
  var Anomalia_media = gradi_360(M[np]);
  var Semiasse = a[np];
  var Periodo = p[np];
  var Inclinazione = i[np];
  var Long_perielio = gradi_360(ap[np] + nd[np]);
  var Long_nodo = nd[np];
  var eccentr = e[np];
  var dim_ang = d[np];
  var magnitudine = m[np];

  if (np == 8) {
    Anomalia_media = gradi_360(Long_media - ap[8] - nd[8]);
  }

  var elem_orb = new Array(
    Periodo,
    Long_media,
    Anomalia_media,
    Long_perielio,
    eccentr,
    Semiasse,
    Inclinazione,
    Long_nodo,
    dim_ang,
    magnitudine,
  );

  return elem_orb;
}

//                                           calcola il DELTA_T                                               INIZIO

function delta_T(anno) {
  // funzione per il calcolo di delta_T da utilizzare per il terrestrial time.
  // algoritmo NASA

  var t = 0;
  var DT = 0;

  if (anno < -500) {
    t = (anno - 1820) / 100;
    DT = -20 + 32 * t * t;
  }

  if (anno >= -500 && anno <= 500) {
    t = anno / 100;
    DT =
      10583.6 -
      1014.41 * t +
      33.78311 * t * t -
      5.952053 * t * t * t -
      0.1798452 * t * t * t * t +
      0.022174192 * t * t * t * t * t +
      0.0090316521 * t * t * t * t * t * t;
  }

  if (anno > 500 && anno <= 1600) {
    t = (anno - 1000) / 100;
    DT =
      1574.2 -
      556.01 * t +
      71.23472 * t * t +
      0.319781 * t * t * t -
      0.8503463 * t * t * t * t -
      0.005050998 * t * t * t * t * t +
      0.0083572073 * t * t * t * t * t * t;
  }

  if (anno > 1600 && anno <= 1700) {
    t = anno - 1600;
    DT = 120 - 0.9808 * t - 0.01532 * t * t + (t * t * t) / 7129;
  }

  if (anno > 1700 && anno <= 1800) {
    t = anno - 1700;
    DT =
      8.83 +
      0.1603 * t -
      0.0059285 * t * t +
      0.00013336 * t * t * t -
      (t * t * t * t) / 1174000;
  }

  if (anno > 1800 && anno <= 1860) {
    t = anno - 1800;
    DT =
      13.72 -
      0.332447 * t +
      0.0068612 * t * t +
      0.0041116 * t * t * t -
      0.00037436 * t * t * t * t +
      0.0000121272 * t * t * t * t * t -
      0.0000001699 * t * t * t * t * t * t +
      0.000000000875 * t * t * t * t * t * t * t;
  }

  if (anno > 1860 && anno <= 1900) {
    t = anno - 1860;
    DT =
      7.62 +
      0.5737 * t -
      0.251754 * t * t +
      0.01680668 * t * t * t -
      0.0004473624 * t * t * t * t +
      (t * t * t * t * t) / 233174;
  }

  if (anno > 1900 && anno <= 1920) {
    t = anno - 1900;
    DT =
      -2.79 +
      1.494119 * t -
      0.0598939 * t * t +
      0.0061966 * t * t * t -
      0.000197 * t * t * t * t;
  }

  if (anno > 1920 && anno <= 1941) {
    t = anno - 1920;
    DT = 21.2 + 0.84493 * t - 0.0761 * t * t + 0.0020936 * t * t * t;
  }

  if (anno > 1941 && anno <= 1961) {
    t = anno - 1950;
    DT = 29.07 + 0.407 * t - (t * t) / 233 + (t * t * t) / 2547;
  }

  if (anno > 1961 && anno <= 1986) {
    t = anno - 1975;
    DT = 45.45 + 1.067 * t - (t * t) / 260 - (t * t * t) / 718;
  }

  if (anno > 1986 && anno <= 2005) {
    t = anno - 2000;
    DT =
      63.86 +
      0.3345 * t -
      0.060374 * t * t +
      0.0017275 * t * t * t +
      0.000651814 * t * t * t * t +
      0.00002373599 * t * t * t * t * t;
  }

  if (anno > 2005 && anno <= 2050) {
    t = anno - 2000;
    DT = 62.92 + 0.32217 * t + 0.005589 * t * t;
  }

  if (anno > 2050 && anno <= 2150) {
    DT =
      -20 +
      32 * ((anno - 1820) / 100) * ((anno - 1820) / 100) -
      0.5628 * (2150 - anno);
  }

  if (anno > 2150) {
    t = (anno - 1820) / 100;
    DT = -20 + 32 * t * t;
  }

  DT = DT.toFixed(2) * 1; // VALORE DI DELTA_T in secondi.

  return DT;
}

//                                           calcola il DELTA_T                                             FINE

function nutazione(njd) {
  // calcola i parametri da utilizzare per la nutazione

  var T = (njd - 2415020.0) / 36525;

  var L = 279.6967 + 36000.7689 * T + 0.000303 * T * T;
  var L1 = 270.4342 + 481267.8831 * T - 0.001133 * T * T;
  var M = 358.4758 + 35999.0498 * T - 0.00015 * T * T;
  var M1 = 296.1046 + 477198.8491 * T + 0.009192 * T * T;
  var LN = 259.1833 - 1934.142 * T + 0.002078 * T * T;

  var DELTA_FI =
    -(17.2327 + 0.01737 * T) * Math.sin(Rad(LN)) -
    (1.2729 + 0.00013 * T) * Math.sin(Rad(2 * L)) +
    0.2088 * Math.sin(Rad(2 * LN)) -
    0.2037 * Math.sin(Rad(2 * L1)) +
    (0.1261 - 0.00031 * T) * Math.sin(Rad(M)) +
    0.0675 * Math.sin(Rad(M1)) -
    (0.0497 - 0.00012 * T) * Math.sin(Rad(2 * L + M)) -
    0.0342 * Math.sin(Rad(2 * L1 - LN)) -
    0.0261 * Math.sin(Rad(2 * L1 + M1)) +
    0.0214 * Math.sin(Rad(2 * L - M)) -
    0.0149 * Math.sin(Rad(2 * L - 2 * L1 + M1)) +
    0.0124 * Math.sin(Rad(2 * L - LN)) +
    0.0114 * Math.sin(Rad(2 * L1 - M1));

  var DELTA_EP =
    (9.21 + 0.00091 * T) * Math.cos(Rad(LN)) +
    (0.5522 - 0.00029 * T) * Math.cos(Rad(2 * L)) -
    0.0904 * Math.cos(Rad(2 * LN)) +
    0.0884 * Math.cos(Rad(2 * L1)) +
    0.0216 * Math.cos(Rad(2 * L + M)) +
    0.0183 * Math.cos(Rad(2 * L1 - LN)) +
    0.0113 * Math.cos(Rad(2 * L1 + M1)) -
    0.0093 * Math.cos(Rad(2 * L - M)) -
    0.0066 * Math.cos(Rad(2 * L - LN));

  var parametri = new Array(DELTA_FI, DELTA_EP);

  return parametri;
}

// **********************************************************************************************************************************
//***********************************************************************************************************************************

//                       calcola la posizione apparente di un astro         - inizio.

function pos_app(njd, AR, DE) {
  // calcola la posizione apparente di un astro -nutazione e aberrazione della luce

  var T = (njd - 2415020.0) / 36525;

  var obli_eclittica =
    23.452294 - 0.0130125 * T - 0.00000164 * T * T + 0.000000503 * T * T * T;
  obli_eclittica = Rad(obli_eclittica);

  var nutaz = nutazione(njd);

  //  effetto dovuto alla nutazione.

  var Delta_ar =
    (Math.cos(obli_eclittica) +
      Math.sin(obli_eclittica) * Math.sin(Rad(AR * 15)) * Math.tan(Rad(DE))) *
      nutaz[0] -
    Math.cos(Rad(AR * 15)) * Math.tan(Rad(DE)) * nutaz[1];
  var Delta_de =
    Math.sin(obli_eclittica) * Math.cos(Rad(AR * 15)) * nutaz[0] +
    Math.sin(Rad(AR * 15)) * nutaz[1];

  // effetto dovuto all'aberrazione annua.

  var PSOLE = pos_sole(njd); // calcola la longitudine del Sole.
  var LSOLE = PSOLE[2]; // longitudine del Sole.

  var Delta_ar1 =
    (-20.49 *
      (Math.cos(Rad(AR * 15)) *
        Math.cos(Rad(LSOLE)) *
        Math.cos(obli_eclittica) +
        Math.sin(Rad(AR * 15)) * Math.sin(Rad(LSOLE)))) /
    Math.cos(Rad(DE));
  var Delta_de1 =
    -20.49 *
    (Math.cos(Rad(LSOLE)) *
      Math.cos(obli_eclittica) *
      (Math.tan(obli_eclittica) * Math.cos(Rad(DE)) -
        Math.sin(Rad(AR * 15)) * Math.sin(Rad(DE))) +
      Math.cos(Rad(AR * 15)) * Math.sin(Rad(LSOLE)) * Math.sin(Rad(DE)));

  // correzione coordinate equatoriali.

  var AR_C = AR + (Delta_ar + Delta_ar1) / 15 / 3600;
  var DE_C = DE + (Delta_de + Delta_de1) / 3600;

  var RID_COORD = new Array(AR_C, DE_C); //coordinate equatoriali ridotte.

  return RID_COORD;
}

//                       calcola la posizione apparente di un astro        - fine.

//***********************************************************************************************************************************
//***********************************************************************************************************************************

function pos_app_pa(njd, AR, DE, P, LAT, LON, ALT) {
  // calcola la posizione apparente di un astro - nutazione - aberrazione della luce e parallasse geocentrica.
  // nutazione e aberrazione.

  var cnutab = pos_app(njd, AR, DE); // applica la correzione per la nutazione e l'aberrazione.

  var ARna = cnutab[0]; // ascensione retta.
  var DEna = cnutab[1]; // declinazione.

  // parallasse.

  var cpar = cor_parall(njd, ARna, DEna, P, LAT, LON, ALT); // applica la correzione per la parallasse geocentrica.

  var ARp = cpar[0]; // ascensione retta.
  var DEp = cpar[1]; // declinazione.

  var RID_COORD = new Array(ARp, DEp); //coordinate equatoriali ridotte.

  return RID_COORD;
}

//***********************************************************************************************************************************
//***********************************************************************************************************************************

function t_luce(njd, np) {
  // calcola il tempo luce del pianeta np.
  // calcolo con posizione approssimata del pianeta.
  // l'orbita del pianeta è considerata circolare.

  var T = new Array(
    0.24085,
    0.61521,
    1.00004,
    1.88089,
    11.86224,
    29.45771,
    84.01247,
    164.79558,
  );
  var L = new Array(
    231.2973,
    355.73352,
    98.83354,
    126.30783,
    146.966365,
    165.322242,
    228.0708551,
    260.3578998,
  );
  var R = new Array(
    0.3870986,
    0.7233316,
    1.0,
    1.5236883,
    5.202561,
    9.554747,
    19.21814,
    30.10957,
  );

  var D = njd - 2444238.5;

  var LP = (360 / 365.2422) * (D / T[np]) + L[np];

  var LT = (360 / 365.2422) * (D / 1.0004) + 98.83354;

  var delta_L = Math.abs(LP - LT);

  var distanza = R[np] * R[np] + 1 - 2 * R[np] * Math.cos(Rad(delta_L));
  var distanza = Math.sqrt(distanza);

  //var eff_p=pos_pianeti(njd,np);

  //var distanza=eff_p[4];               // distanza del pianeta in U.A. dalla Terra.

  var tempo_luce = 0.0057756 * distanza; // tempo luce in giorni.

  return tempo_luce;
}

//  calcola la posizione della Luna

function pos_luna(njd) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2010.
  // funzione per il calcolo della posizione della Luna.
  // njd= numero dei giorni giuliani per il T.U. di Greenwich.
  // coordinate equatoriali geocentriche per l'equinozio della data.

  var T = (njd - 2415020.0) / 36525;

  var L1 =
    270.434164 + 481267.8831 * T - 0.001133 * T * T + 0.0000019 * T * T * T; // longitudine media.

  var M =
    358.475833 + 35999.04975 * T - 0.00015 * T * T - 0.0000033 * T + T * T; // anomalia media del Sole

  var M1 =
    296.104608 + 477198.8491 * T + 0.009192 * T * T + 0.0000144 * T * T * T; // anomalia media della Luna

  var D =
    350.737486 + 445267.1142 * T - 0.001436 * T * T + 0.0000019 * T * T * T; // elongazione media della Luna

  var F =
    11.250889 + 483202.0251 * T - 0.003211 * T * T - 0.0000003 * T * T * T; // distanza media della Luna dal suo nodo ascendente.

  var N = 259.183275 - 1934.142 * T + 0.002078 * T * T + 0.0000022 * T * T * T; // longitudine media del nodo ascendente della Luna.

  // termini additivi di correzione.

  var Delta = 0.003964 * Math.sin(Rad(346.56 + 132.87 * T - 0.0091731 * T * T));

  L1 = L1 + 0.000233 * Math.sin(Rad(51.2 + 20.2 * T)) + Delta;
  M = M - 0.001778 * Math.sin(Rad(51.2 + 20.2 * T));
  M1 = M1 + 0.000817 * Math.sin(Rad(51.2 + 20.2 * T)) + Delta;
  D = D + 0.002011 * Math.sin(Rad(51.2 + 20.2 * T)) + Delta;

  L1 = L1 + 0.001964 * Math.sin(Rad(N));
  M1 = M1 + 0.002541 * Math.sin(Rad(N));
  D = D + 0.001964 * Math.sin(Rad(N));
  F = F - 0.024691 * Math.sin(Rad(N));
  F = F - 0.004328 * Math.sin(Rad(N + 275.05 - 2.3 * T));
  F = F + Delta;

  var e = 1 - 0.002495 * T - 0.00000752 * T * T;

  // Calcola la Longitudine ecclittica.

  var Long =
    L1 +
    6.28875 * Math.sin(Rad(M1)) +
    1.274018 * Math.sin(Rad(2 * D - M1)) +
    0.658309 * Math.sin(Rad(2 * D)) +
    0.213616 * Math.sin(Rad(2 * M1)) -
    0.185596 * Math.sin(Rad(M)) * e -
    0.114336 * Math.sin(Rad(2 * F)) +
    0.058793 * Math.sin(Rad(2 * D - 2 * M1)) +
    0.057212 * Math.sin(Rad(2 * D - M - M1)) * e +
    0.05332 * Math.sin(Rad(2 * D + M1)) +
    0.045874 * Math.sin(Rad(2 * D - M)) * e +
    0.041024 * Math.sin(Rad(M1 - M)) * e -
    0.034718 * Math.sin(Rad(D)) -
    0.030465 * Math.sin(Rad(M + M1)) * e +
    0.015326 * Math.sin(Rad(2 * D - 2 * F)) -
    0.012528 * Math.sin(Rad(2 * F + M1)) -
    0.01098 * Math.sin(Rad(2 * F - M1)) +
    0.010674 * Math.sin(Rad(4 * D - M1)) +
    0.010034 * Math.sin(Rad(3 * M1)) +
    0.008548 * Math.sin(Rad(4 * D - 2 * M1)) -
    0.00791 * Math.sin(Rad(M - M1 + 2 * D)) * e -
    0.006783 * Math.sin(Rad(2 * D + M)) * e +
    0.005162 * Math.sin(Rad(M1 - D)) -
    0.005 * Math.sin(Rad(M + D)) * e +
    0.004049 * Math.sin(Rad(M1 - M + 2 * D)) * e +
    0.003996 * Math.sin(Rad(2 * M1 + 2 * D)) +
    0.003862 * Math.sin(Rad(4 * D)) +
    0.003665 * Math.sin(Rad(2 * D - 3 * M1)) +
    0.002695 * Math.sin(Rad(2 * M1 - M)) * e +
    0.002602 * Math.sin(Rad(M1 - 2 * F - 2 * D)) +
    0.002396 * Math.sin(Rad(2 * D - M - 2 * M1)) * e -
    0.002349 * Math.sin(Rad(M1 + D)) +
    0.002249 * Math.sin(Rad(2 * D - 2 * M)) * e * e -
    0.002125 * Math.sin(Rad(2 * M1 + M)) * e -
    0.002079 * Math.sin(Rad(2 * M)) * e * e +
    0.002059 * Math.sin(Rad(2 * D - M1 - 2 * M)) * e * e -
    0.001773 * Math.sin(Rad(M1 + 2 * D - 2 * F)) -
    0.001595 * Math.sin(Rad(2 * F + 2 * D)) +
    0.00122 * Math.sin(Rad(4 * D - M - M1)) * e -
    0.00111 * Math.sin(Rad(2 * M1 + 2 * F)) +
    0.000892 * Math.sin(Rad(M1 - 3 * D)) -
    0.000811 * Math.sin(Rad(M + M1 + 2 * D)) * e +
    0.000761 * Math.sin(Rad(4 * D - M - 2 * M1)) * e +
    0.000717 * Math.sin(Rad(M1 - 2 * M)) * e * e +
    0.000704 * Math.sin(Rad(M1 - 2 * M - 2 * D)) * e * e +
    0.000693 * Math.sin(Rad(M - 2 * M1 + 2 * D)) * e +
    0.000598 * Math.sin(Rad(2 * D - M - 2 * F)) * e +
    0.00055 * Math.sin(Rad(M1 + 4 * D)) +
    0.000538 * Math.sin(Rad(4 * M1)) +
    0.000521 * Math.sin(Rad(4 * D - M)) * e +
    0.000486 * Math.sin(Rad(2 * M1 - D));

  // Calcolo della Latitudine ecclittica.

  var Beta =
    5.128189 * Math.sin(Rad(F)) +
    0.280606 * Math.sin(Rad(M1 + F)) +
    0.277693 * Math.sin(Rad(M1 - F)) +
    0.173238 * Math.sin(Rad(2 * D - F)) +
    0.055413 * Math.sin(Rad(2 * D + F - M1)) +
    0.046272 * Math.sin(Rad(2 * D - F - M1)) +
    0.032573 * Math.sin(Rad(2 * D + F)) +
    0.017198 * Math.sin(Rad(2 * M1 + F)) +
    0.009267 * Math.sin(Rad(2 * D + M1 - F)) +
    0.008823 * Math.sin(Rad(2 * M1 - F)) +
    0.008247 * Math.sin(Rad(2 * D - M - F)) * e +
    0.004323 * Math.sin(Rad(2 * D - F - 2 * M1)) +
    0.0042 * Math.sin(Rad(2 * D + F + M1)) +
    0.003372 * Math.sin(Rad(F - M - 2 * D)) * e +
    0.002472 * Math.sin(Rad(2 * D + F - M - M1)) * e +
    0.002222 * Math.sin(Rad(2 * D + F - M)) * e +
    0.002072 * Math.sin(Rad(2 * D - F - M - M1)) * e +
    0.001877 * Math.sin(Rad(F - M + M1)) * e +
    0.001828 * Math.sin(Rad(4 * D - F - M1)) -
    0.001803 * Math.sin(Rad(F + M)) * e -
    0.00175 * Math.sin(Rad(3 * F)) +
    0.00157 * Math.sin(Rad(M1 - M - F)) * e -
    0.001487 * Math.sin(Rad(F + D)) -
    0.001481 * Math.sin(Rad(F + M + M1)) * e +
    0.001417 * Math.sin(Rad(F - M - M1)) * e +
    0.00135 * Math.sin(Rad(F - M)) * e +
    0.00133 * Math.sin(Rad(F - D)) +
    0.001106 * Math.sin(Rad(F + 3 * M1)) +
    0.00102 * Math.sin(Rad(4 * D - F)) +
    0.000833 * Math.sin(Rad(F + 4 * D - M1)) +
    0.000781 * Math.sin(Rad(M1 - 3 * F)) +
    0.00067 * Math.sin(Rad(F + 4 * D - 2 * M1)) +
    0.000606 * Math.sin(Rad(2 * D - 3 * F)) +
    0.000597 * Math.sin(Rad(2 * D + 2 * M1 - F)) +
    0.000492 * Math.sin(Rad(2 * D + M1 - M - F)) * e +
    0.00045 * Math.sin(Rad(2 * M1 - F - 2 * D)) +
    0.000439 * Math.sin(Rad(3 * M1 - F)) +
    0.000423 * Math.sin(Rad(F + 2 * D + 2 * M1)) +
    0.000422 * Math.sin(Rad(2 * D - F - 3 * M1)) -
    0.000367 * Math.sin(Rad(M + F + 2 * D - M1)) * e -
    0.000353 * Math.sin(Rad(M + F + 2 * D)) * e +
    0.000331 * Math.sin(Rad(F + 4 * D)) +
    0.000317 * Math.sin(Rad(2 * D + F - M + M1)) * e +
    0.000306 * Math.sin(Rad(2 * D - 2 * M - F)) * e * e -
    0.000283 * Math.sin(Rad(M1 + 3 * F));

  var omega1 = 0.0004664 * Math.cos(Rad(N));
  var omega2 = 0.0000754 * Math.cos(Rad(N + 275.05 - 2.3));

  var Lat = Beta * (1 - omega1 - omega2); // latitudine ecclittica.

  // Calcolo della parallasse.

  var parallasse =
    0.950724 +
    0.051818 * Math.cos(Rad(M1)) +
    0.009531 * Math.cos(Rad(2 * D - M1)) +
    0.007843 * Math.cos(Rad(2 * D)) +
    0.002824 * Math.cos(Rad(2 * M1)) +
    0.000857 * Math.cos(Rad(2 * D + M1)) +
    0.000533 * Math.cos(Rad(2 * D - M)) * e +
    0.000401 * Math.cos(Rad(2 * D - M - M1)) * e +
    0.00032 * Math.cos(Rad(M1 - M)) * e -
    0.000271 * Math.cos(Rad(D)) -
    0.000264 * Math.cos(Rad(M1 + M)) * e -
    0.000198 * Math.cos(Rad(2 * F - M1)) +
    0.000173 * Math.cos(Rad(3 * M1)) +
    0.000167 * Math.cos(Rad(4 * D - M1)) -
    0.000111 * Math.cos(Rad(M)) * e +
    0.000103 * Math.cos(Rad(4 * D - 2 * M1)) -
    0.000084 * Math.cos(Rad(2 * M1 - 2 * D)) -
    0.000083 * Math.cos(Rad(2 * D + M)) * e +
    0.000079 * Math.cos(Rad(2 * D + 2 * M1)) +
    0.000072 * Math.cos(Rad(4 * D)) +
    0.000064 * Math.cos(Rad(2 * D - M + M1)) * e -
    0.000063 * Math.cos(Rad(2 * D + M - M1)) * e +
    0.000041 * Math.cos(Rad(M + D)) * e +
    0.000035 * Math.cos(Rad(2 * M1 - M)) * e -
    0.000033 * Math.cos(Rad(3 * M1 - 2 * D)) -
    0.00003 * Math.cos(Rad(M1 + D)) -
    0.000029 * Math.cos(Rad(2 * F - 2 * D)) -
    0.000029 * Math.cos(Rad(2 * M1 + M)) * e +
    0.000026 * Math.cos(Rad(2 * D - 2 * M)) * e * e -
    0.000023 * Math.cos(Rad(2 * F - 2 * D + M1)) +
    0.000019 * Math.cos(Rad(4 * D - M - M1)) * e;

  Long = gradi_360(Long); // La longitudine all'interno dell'intervallo 0-360.

  var dati_luna = trasf_ecli_equa(njd, Long, Lat); // calcola le coordinate equatoriali geocentriche.

  //   dati del Sole.

  var dat_sole = pos_sole(njd); // calcola la longitudine del sole
  var Long_sole = dat_sole[2]; // longitudine  vera del sole.

  // CALCOLO DELLA FASE E DELL'ELONGAZIONE

  var Elongazione = elong(dati_luna[0], dati_luna[1], dat_sole[0], dat_sole[1]); //  elongazione in gradi dal Sole.

  var Fase_luna = 0.5 * (1 - Math.cos(Rad(Elongazione))); // FASE

  var dist_luna = 6378.14 / Math.sin(Rad(parallasse));
  dist_luna = dist_luna.toFixed(0); // Distanza in Km.

  var dim_app = Math.atan(3476.2 / dist_luna);
  dim_app = Rda(dim_app) * 3600;
  dim_app = dim_app.toFixed(2); // Diametro apparente in secondi d'arco.

  // elenco delle variabili restituite dalla funzione [pos_luna].

  // dati_luna[0]= ascensione retta già in ore decimali (diviso per 15).
  // dati_luna[1]= declinazione in gradi sessadecimali.
  dati_luna[2] = Long; // in gradi sessadecimali.
  dati_luna[3] = Fase_luna; // fase lunare.
  dati_luna[4] = Elongazione; // elongazione in gradi sessadecimali.
  dati_luna[5] = parallasse; // parallasse della Luna in gradi.
  dati_luna[6] = dim_app; // diametro apparente in secondi d'arco.
  dati_luna[7] = dist_luna; // distanza della Luna in Km.

  return dati_luna;
}

//***********************************************************************************************************************************
//***********************************************************************************************************************************

function elong(AR1, DE1, AR2, DE2) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2010.
  // calcola l'elongazione
  // l'elongazione verrà calcolata utilizzando l'astro 2 (individuato dalle coordinate  AR2,DE2), come riferimento.

  AR1 = AR1 * 15;
  AR2 = AR2 * 15;

  var elongazione =
    Math.sin(Rad(DE1)) * Math.sin(Rad(DE2)) +
    Math.cos(Rad(AR1 - AR2)) * Math.cos(Rad(DE1)) * Math.cos(Rad(DE2));
  elongazione = Math.acos(elongazione);
  elongazione = Rda(elongazione); // da radianti a sessadecimali.

  var ARV1 = gradi_360(AR1 - AR2);

  if (ARV1 > 180) {
    elongazione = -elongazione;
  }

  return elongazione; // per valori negativi, l'astro (1) si trova ad ovest rispetto al (2).
}
// *********************************************************************************************************************************
// *********************************************************************************************************************************

//************************************************* DISTANZA ANGOLARE   ************************************************************
//**********************************************************************************************************************************

function dist_ang(AR1, DE1, AR2, DE2) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2011.
  // calcola la distanza angolare tra due astri.

  AR1 = AR1 * 15; // ar in gradi.
  AR2 = AR2 * 15; // ar in gradi.

  var elongazione =
    Math.sin(Rad(DE1)) * Math.sin(Rad(DE2)) +
    Math.cos(Rad(AR1 - AR2)) * Math.cos(Rad(DE1)) * Math.cos(Rad(DE2));
  elongazione = Math.acos(elongazione);
  elongazione = Rda(elongazione); // da radianti a sessadecimali.

  return elongazione;
}

//***********************************************************************************************************************************
//***********************************************************************************************************************************

//************************************************* DISTANZA CARTESIANA   ***********************************************************
//***********************************************************************************************************************************

function dist_cart(x1, y1, x2, y2) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) 2012.
  // calcola la distanza tra due punti di coordinate cartesiane x1,y1,x2,y2.

  var a = x1 - x2;
  var b = y1 - y2;

  var distanza = Math.sqrt(a * a + b * b); // distanza.

  return distanza;
}

//***********************************************************************************************************************************
//***********************************************************************************************************************************

// ******************************* EQUINOZIO e  SOLSTIZIO     ******************************  inizio

export function eqsol(anno) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2010.
  // calcola la data degli equinozi e dei solstizi per l'anno indicato nel parametro.

  var Y = anno;
  var y1 = Y / 1000;

  var jd1 =
    1721139.2855 +
    365.2421376 * Y +
    0.067919 * y1 * y1 -
    0.0027879 * y1 * y1 * y1; //  EQUINOZIO DI MARZO

  var jd2 =
    1721233.2486 +
    365.2417284 * Y -
    0.053018 * y1 * y1 +
    0.009332 * y1 * y1 * y1; //  SOLSTIZIO DI GIUGNO

  var jd3 =
    1721325.6978 +
    365.2425055 * Y -
    0.126689 * y1 * y1 +
    0.0019401 * y1 * y1 * y1; //  EQUINOZIO DI SETTEMBRE

  var jd4 =
    1721414.392 +
    365.2428898 * Y -
    0.010965 * y1 * y1 -
    0.0084885 * y1 * y1 * y1; //  SOLSTIZIO DI DICEMBRE

  var tempi = new Array(jd1, jd2, jd3, jd4);

  return tempi;
}

// *********************************** EQUINOZIO e  SOLSTIZIO ******************************  fine

// *********************************** RIFRAZIONE ATMOSFERICA ****************************** inizio

function rifraz(Z1) {
  // Calcola l'effetto della rifrazione sull'angolo zenitale Z1. formula di G.G.Bennett.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) ottobre 2011.
  // Z1= angolo zenitale in gradi sessadecimali.
  // la rifrazione fa apparire l'astro più vicino allo zenit.
  // la funzione restituisce l'angolo zenitale apparente.

  var DELTA_R = Rad(90 - Z1 + 7.31 / (90 - Z1 + 4.4));

  var R1 = 1 / Math.tan(DELTA_R); // in primi d'arco.

  var R = R1 - 0.06 * Math.sin(Rad(14.7 * (R1 / 60) + 13));

  var Z = Z1 - R / 60;

  if (Z1 > 90) {
    Z = Z1 - 0.566667;
  }

  return Z; //angolo zenitale apparente in gradi.
}

// *********************************** RIFRAZIONE ATMOSFERICA ****************************** fine

function Lnum(numero, lunghezza) {
  // aggiunge degli zeri davanti al numero fino a raggiungere la lunghezza specificata.

  var lun_num = String(numero);

  for (a = 0; a < lunghezza; a++) {
    if (lun_num.length < lunghezza) {
      lun_num = '0' + lun_num;
    }
  }

  return lun_num;
}

function Lstr(stringa, lunghezza) {
  // aggiunge degli spazi davanti alla stringa fino a raggiungere la lunghezza specificata.
  // per ogni carattere da spaziare moltiplicare la lunghezza per 10.

  var lun_num = stringa;

  for (a = 0; a < lunghezza; a++) {
    if (lun_num.length < lunghezza) {
      lun_num = '&nbsp;' + lun_num;
    }
  }

  return lun_num;
}

// *********************************** RIFRAZIONE ATMOSFERICA ****************************** fine

function corr_alt(ALT) {
  // Correzione dell'altezza ( coordinate azimutali ) in funzione dell'altitudine.
  // ALT=altitudine in metri sul livello del mare.
  // la funzione restituisce il valore (in gradi) da aggiungere all'altezza dell'astro.
  // 12-2011.

  var altitudine = ALT / 1000; // in Km.

  var delta_h = 90 - Rda(Math.asin(6378 / (6378 + altitudine)));

  return delta_h; // da aggiungere all'altezza.
}

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

function hams_dec(gradi, minuti, secondi) {
  // Trasforma un angolo indicato in gg mm ss in un angolo decimale.
  // da utilizzare anche con le ore indicate in hh mm ss.
  // quando i gradi sono uguali a -0 inserire il segno - nei minuti o nei secondi <>0 per non perdere il segno.
  // 12-2011.

  var ha_dec =
    Math.abs(gradi) + Math.abs(minuti / 60) + Math.abs(secondi / 3600);

  if (gradi < 0 || minuti < 0 || secondi < 0) {
    ha_dec = -ha_dec;
  }

  return ha_dec;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
//                        FUNZIONE PER IL CALCOLO DEL SORGERE, TRANSITO E DEL TRAMONTARE DEL SOLE                           - INIZIO
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

function ST_SOLE(njd, LON, LAT, ALT) {
  // metodo iterativo per calcolare il sorgere il transito e il tramontare del Sole.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy). Luglio 2012.
  // gli istanti sono espressi in T.U. di Greenwich.
  // oltre ai tempi calcola gli azimut del sorgere e del tramontare.
  // Nel calcolo si tiene conto della rifrazione atmosferica (34'), dell'altitudine dell'osservatore e del raggio apparente del Sole (vedi funzione ST_ASTRO_DATA()).

  var p_astro = 0; // posizione del sole
  var tempo_sorgere = 0; // tempo del sorgere.
  var tempo_tramonto = 0; // tempo del tramonto.
  var tempo_transito = 0; // tempo transito.
  var azimut_sorgere = 0; // azimut sorgere.
  var azimut_tramonto = 0; // azimut tramonto.
  var st_astri_sl = 0; //

  njd = jdHO(njd); // riporta il g.g. della data, all'ora H0(zero) del giorno.

  var njd1 = njd; // numero del Giorno Giuliano.
  var raggio = 0.25; // raggio apparente del sole.

  // **** Inizio delle 5 iterazioni per il calcolo del Sorgere del Sole.

  for (a = 0; a < 5; a++) {
    p_astro = pos_sole(njd1); // recupera l'AR la DE e il raggio apparente del Sole.
    raggio = p_astro[5] / 3600 / 2; // raggio apparente del Sole in gradi.
    st_astri_sl = ST_ASTRO_DATA(
      njd1,
      p_astro[0],
      p_astro[1],
      LON,
      LAT,
      ALT,
      raggio,
    );
    tempo_sorgere = st_astri_sl[2]; // istante del sorgere.
    njd1 = njd + tempo_sorgere / 24;
  }

  azimut_sorgere = st_astri_sl[0]; // azimut del sorgere.

  // **** Inizio delle 5 iterazioni per il calcolo del transito del Sole.

  for (a = 0; a < 5; a++) {
    p_astro = pos_sole(njd1);
    p_app = pos_app(njd1, p_astro[0], p_astro[1]); // coordinate equatoriali apparenti
    raggio = p_astro[5] / 3600 / 2;
    st_astri_sl = ST_ASTRO_DATA(
      njd1,
      p_app[0],
      p_app[1],
      LON,
      LAT,
      ALT,
      raggio,
    );
    tempo_transito = st_astri_sl[3]; // istante del transito.
    njd1 = njd + tempo_transito / 24;
  }

  // **** Inizio delle 5 iterazioni per il calcolo del tramontare del Sole.

  for (a = 0; a < 5; a++) {
    p_astro = pos_sole(njd1);
    raggio = p_astro[5] / 3600 / 2;
    st_astri_sl = ST_ASTRO_DATA(
      njd1,
      p_astro[0],
      p_astro[1],
      LON,
      LAT,
      ALT,
      raggio,
    );
    tempo_tramonto = st_astri_sl[4]; // istante del tramonto.
    njd1 = njd + tempo_tramonto / 24;
  }

  azimut_tramonto = st_astri_sl[1]; // azimut del tramontare.

  var tempi_st = new Array(
    azimut_sorgere,
    azimut_tramonto,
    tempo_sorgere,
    tempo_transito,
    tempo_tramonto,
  );
  // VARIABILI RESTITUITE       0              1              2             3              4

  return tempi_st;
}

// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
//                              FUNZIONE PER IL CALCOLO DEL SORGERE, TRANSITO E DEL TRAMONTARE DEL SOLE                      - FINE
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
//
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
//                              FUNZIONE PER IL CALCOLO DEL SORGERE, TRANSITO E DEL TRAMONTARE DELLA LUNA                  - INIZIO
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------

function ST_LUNA(njd, LON, LAT, ALT) {
  // metodo iterativo per calcolare il sorgere e il tramontare della Luna
  //  compresi gli azimut del sorgere e del tramontare.
  //  nel calcolo si tiene conto della rifrazione, altitudine dell'osservatore e della parallasse lunare.
  //  by Salvatore Ruiu Irgoli-Sardegna (Italy). 10 Dicembre 2011.

  var p_astro = 0; // posizione della Luna.
  var tempo_sorgere = 0; // tempo del sorgere.
  var tempo_tramonto = 0; // tempo del tramonto.
  var tempo_transito = 0; // tempo transito.
  var azimut_sorgere = 0; // azimut sorgere.
  var azimut_tramonto = 0; // azimut tramonto.
  var st_astri_sl = 0; //

  njd = jdHO(njd); // riporta il g.g. della data all'ora H0(zero) del giorno.

  var njd1 = njd; // giorno giuliano corretto per il sorgere o per il tramonto.
  var raggio = 0.25; // raggio apparente della Luna.

  // **** inizio delle 10 iterazioni previste per il calcolo del Sorgere della Luna.

  for (a = 0; a < 10; a++) {
    p_astro = pos_luna(njd1); // recupera l'AR la DE e il raggio apparente del Sole.
    raggio = p_astro[6] / 3600 / 2; // raggio della Luna in gradi.
    p_app = pos_app_pa(njd1, p_astro[0], p_astro[1], p_astro[5], LAT, LON, ALT);

    st_astri_sl = ST_ASTRO_DATA(
      njd1,
      p_app[0],
      p_app[1],
      LON,
      LAT,
      ALT,
      raggio,
    );

    tempo_sorgere = st_astri_sl[2]; // istante del sorgere.
    njd1 = njd + tempo_sorgere / 24;
  }

  azimut_sorgere = st_astri_sl[0]; // azimut del sorgere.

  // **** inizio delle 10 iterazioni previste per il calcolo del transito della Luna.

  for (a = 0; a < 10; a++) {
    p_astro = pos_luna(njd1);
    raggio = p_astro[6] / 3600 / 2; // astro di riferimento: sole.
    p_app = pos_app_pa(njd1, p_astro[0], p_astro[1], p_astro[5], LAT, LON, ALT);

    st_astri_sl = ST_ASTRO_DATA(
      njd1,
      p_app[0],
      p_app[1],
      LON,
      LAT,
      ALT,
      raggio,
    );

    tempo_transito = st_astri_sl[3]; // istante del transito.
    njd1 = njd + tempo_transito / 24;
  }

  // **** inizio delle 10 iterazioni previste per il calcolo del tramontare della Luna.

  for (a = 0; a < 10; a++) {
    p_astro = pos_luna(njd1);
    raggio = p_astro[6] / 3600 / 2;
    p_app = pos_app_pa(njd1, p_astro[0], p_astro[1], p_astro[5], LAT, LON, ALT);

    st_astri_sl = ST_ASTRO_DATA(
      njd1,
      p_app[0],
      p_app[1],
      LON,
      LAT,
      ALT,
      raggio,
    );

    tempo_tramonto = st_astri_sl[4]; // istante del tramonto.
    njd1 = njd + tempo_tramonto / 24;
  }

  azimut_tramonto = st_astri_sl[1]; // azimut del tramontare.

  //alert(st_astri_sl[5]);

  var tempi_st = new Array(
    azimut_sorgere,
    azimut_tramonto,
    tempo_sorgere,
    tempo_transito,
    tempo_tramonto,
  );
  // VARIABILI RESTITUITE       0              1              2             3              4

  return tempi_st;
}

// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
//                              FUNZIONE PER IL CALCOLO DEL SORGERE, TRANSITO E DEL TRAMONTARE DELLA LUNA                    - FINE
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
//
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
//                        FUNZIONE PER IL CALCOLO DEL SORGERE, TRANSITO E DEL TRAMONTARE DI UN ASTRO                        - INIZIO
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

function ST_ASTRO(AR, DE, LON, LAT, ALT, RAGGIO) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy). giugno 2013
  //  AR:   ascensione retta in ore decimali.
  //   DE:   declinazione in gradi sessadecimali.
  //    LON:  Longitudine in gradi sessadecimali (negativa a ovest di Greenwich).
  //     LAT:  Latitudine in gradi sessadecimali  (negativa per emisfero sud).
  //      ALT:  Altitudine in metri sul livello del mare.
  //       RAGGIO: Raggio dell'astro=0.25 gradi da utilizzare solo per il sole e la luna.
  //        in tutti gli altri casi questo valore è sempre uguale a 0 zero.
  //         I tempi sono in T.U. di GREENWICH. per la data di oggi.
  //         Nel calcolo si tiene conto della rifrazione atmosferica (34') e dell'altitudine dell'osservatore.

  var _alt = corr_alt(ALT); // correzione per l'altitudine.
  var _raggio = RAGGIO; // dimensioni del raggio apparente dell'astro 0.25 gradi per sole e luna.

  var _h = -(0.56667 + _alt + _raggio); // altezza in gradi dell'astro rifrazione+altitudine_osservatore+raggio_apparente.

  // Calcolo dell'angolo orario _H in ore decimali.

  var _H =
    (Math.sin(Rad(_h)) - Math.sin(Rad(LAT)) * Math.sin(Rad(DE))) /
    (Math.cos(Rad(LAT)) * Math.cos(Rad(DE)));
  _H = Math.acos(_H);
  _H = Rda(_H);
  _H = _H / 15;

  // Calcolo dell'azimut del sorgere.

  var _Az =
    (Math.sin(Rad(DE)) - Math.sin(Rad(_h)) * Math.sin(Rad(LAT))) /
    (Math.cos(Rad(_h)) * Math.cos(Rad(LAT)));
  _Az = Math.acos(_Az);
  _Az = Rda(_Az);

  // calcolo degli azimut:

  var _Az_sorge = _Az;
  var _Az_tramonto = 360 - _Az;

  // calcolo dei tempi siderali locali degli eventi (_tsl_):

  var _tsl_sorgere = 24 - _H + AR; // tempo siderale locale del sorgere.
  var _tsl_transito = AR; // tempo siderale locale transito.
  var _tsl_tramonto = _H + AR; // tempo siderale locale del tramonto.

  // calcolo dei tempi siderali di Greenwich (_tsg_).

  var _tsg_sorge = ore_24(_tsl_sorgere - LON / 15);
  var _tsg_transita = ore_24(_tsl_transito - LON / 15);
  var _tsg_tramonta = ore_24(_tsl_tramonto - LON / 15);

  // calcolo dei tempi medi di Greenwich (_tmg_).

  var _tmg_sorge = tras_tsg_tmg(_tsg_sorge) * 1; // tempo medio a GREENWICH sorgere.
  var _tmg_transita = tras_tsg_tmg(_tsg_transita) * 1; // tempo medio a GREENWICH tramonto.
  var _tmg_tramonta = tras_tsg_tmg(_tsg_tramonta) * 1; // tempo medio a GREENWICH transito.

  var _dati_astro = new Array(
    _Az_sorge,
    _Az_tramonto,
    _tmg_sorge,
    _tmg_transita,
    _tmg_tramonta,
    _tsg_sorge,
    _tsg_transita,
    _tsg_tramonta,
    _H,
  ); //  restituisce le variabili numeriche.
  // posizione dei dati         0          1              2          3             4               5            6               7          8

  return _dati_astro;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
//                        FUNZIONE PER IL CALCOLO DEL SORGERE, TRANSITO E DEL TRAMONTARE DI UN ASTRO                          - FINE
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

function ST_PIANETI(njd, np, LON, LAT, ALT) {
  // metodo iterativo per calcolare il sorgere il transito e il tramontare di un pianeta.
  //  by Salvatore Ruiu Irgoli-Sardegna (Italy). 10 Dicembre 2011.

  var p_astro = 0; // posizione del sole
  var tempo_sorgere = 0; // tempo del sorgere.
  var tempo_tramonto = 0; // tempo del tramonto.
  var tempo_transito = 0; // tempo transito.
  var azimut_sorgere = 0; // azimut sorgere.
  var azimut_tramonto = 0; // azimut tramonto.
  var st_astri_sl = 0; //

  njd = jdHO(njd); // riporta il g.g. della data all'ora H0(zero) del giorno.

  var njd1 = njd; // Giorno Giuliano corretto per il sorgere o per il tramonto.
  var jd1 = njd;

  // **** Inizio delle 5 iterazioni per il calcolo del Sorgere di un pianeta.

  for (a = 0; a < 10; a++) {
    p_astro = pos_pianeti(njd1, np); // recupera l'AR la DE del pianeta.
    st_astri_sl = ST_ASTRO_DATA(njd1, p_astro[0], p_astro[1], LON, LAT, ALT, 0);
    tempo_sorgere = st_astri_sl[2]; // istante del sorgere.
    njd1 = njd + tempo_sorgere / 24;
    jd1 = njd1;

    if (st_astri_sl[2] > st_astri_sl[3]) {
      njd1 = njd1 - 1;
    }
  }

  azimut_sorgere = st_astri_sl[0]; // azimut del sorgere.

  // **** Inizio delle 5 iterazioni per il calcolo di un pianeta.

  for (a = 0; a < 10; a++) {
    p_astro = pos_pianeti(njd1, np);
    st_astri_sl = ST_ASTRO_DATA(njd1, p_astro[0], p_astro[1], LON, LAT, ALT, 0);
    tempo_transito = st_astri_sl[3]; // istante del transito.
    njd1 = njd + tempo_transito / 24;
  }

  // **** Inizio delle 5 iterazioni per il calcolo di un pianeta.

  for (a = 0; a < 10; a++) {
    p_astro = pos_pianeti(njd1, np);
    st_astri_sl = ST_ASTRO_DATA(njd1, p_astro[0], p_astro[1], LON, LAT, ALT, 0);
    tempo_tramonto = st_astri_sl[4]; // istante del tramonto.
    njd1 = njd + tempo_tramonto / 24;

    if (st_astri_sl[4] < st_astri_sl[3]) {
      njd1 = njd1 + 1;
    }
  }

  azimut_tramonto = st_astri_sl[1]; // azimut del tramontare.

  var tempi_st = new Array(
    azimut_sorgere,
    azimut_tramonto,
    tempo_sorgere,
    tempo_transito,
    tempo_tramonto,
  );
  // VARIABILI RESTITUITE       0              1              2             3              4

  return tempi_st;
}

// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------
//                                 FUNZIONE PER IL CALCOLO DELL'ANGOLO DI FASE DELLA LUNA                                   - INIZIO
// ---------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------------

function afase_luna(njd) {
  // calcola l'angolo di fase della luna per la data (njd)
  // gennaio 2012

  var dati_luna = pos_luna(njd); // recupero fase/elongazione (1)
  var dati_sole = pos_sole(njd);

  var elongazione1 = dati_luna[4]; // elongazione in gradi sessadecimali.
  var dist_luna = dati_luna[7] / 149597870;
  var dist_sole = dati_sole[4]; // distanza del sole in UA.

  elongazione = Math.abs(elongazione1) * 1;

  var dist_sl =
    dist_luna * dist_luna +
    dist_sole * dist_sole -
    2 * dist_luna * dist_sole * Math.cos(Rad(elongazione)); // distanza sole-luna
  dist_sl = Math.sqrt(dist_sl);

  //   calcolo dell'angolo di fase in gradi .

  var Dpt = dist_luna; // distanza pianeta-terra.
  var Dts = dist_sole; // distanza terra-sole.
  var Dps = dist_sl; // distanza pianeta-sole.

  // teorema del coseno

  var delta_fase = (Dts * Dts + Dps * Dps - Dpt * Dpt) / (2 * Dps * Dts);
  delta_fase = Math.acos(delta_fase);
  delta_fase = Rda(delta_fase);

  var angolo_fase = 180 - elongazione - delta_fase; // angolo di fase in gradi.

  if (elongazione1 < 0) {
    angolo_fase = -angolo_fase;
  }

  return angolo_fase;
}

// **************************************************** CALCOLA L'ANGOLO DI FASE PER UN PIANETA (inizio)

function afase_pianeta(njd, AR, DE, dist_ps, dist_pt) {
  // funzione per il calcolo dell'angolo di fase per un pianeta.
  // AR,DE sono le coordinate equatoriali decimali, del pianeta.
  // njd= numero del giorno giuliano.
  // dist_ps=distanza pianeta-sole in UA.
  // dist_pt=distanza pianeta-Terra in UA.
  // by Salvatore Ruiu - gennaio 2013.

  var coo_sole = pos_sole(njd); // coordinate equatoriali decimali del Sole.
  var Rs = coo_sole[4]; // distanza Terra-Sole.
  var elongaz = elong(AR, DE, coo_sole[0], coo_sole[1]); // elongazione in gradi dal Sole.

  //   calcolo dell'angolo di fase in gradi .

  var Dpt = dist_pt; // distanza pianeta-terra.
  var Dts = Rs; // distanza terra-sole.
  var Dps = dist_ps; // distanza pianeta-sole.

  // risolve il teorema del coseno (noti i 3 lati del triangolo).

  var delta_fase = (Dts * Dts + Dps * Dps - Dpt * Dpt) / (2 * Dps * Dts);
  delta_fase = Math.acos(delta_fase);
  delta_fase = Rda(delta_fase);

  var angolo_fase = 180 - Math.abs(elongaz) - delta_fase; // risultato: angolo di fase in gradi.

  return angolo_fase;
}

// **************************************************** CALCOLA L'ANGOLO DI FASE PER UN PIANETA (fine)

// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------
//                                                NOME DELLE FASI LUNARI IN ITALIANO E INGLESE                               - FINE
// --------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------

function name_phase(elongazione, LG) {
  // nome delle fasi lunari.
  // elongazione della Luna.
  // LG=lingua   "ITA" , "ENG"
  // Salvatore Ruiu Gennaio 2012.

  var elong = elongazione + 360;
  var nome_fase = '*';

  if (elong > 360) {
    elong = elong - 360;
  }

  if (LG == 'ITA') {
    if (elong > 0 && elong < 10) {
      nome_fase = 'Luna Nuova';
    } else if (elong > 10 && elong < 80) {
      nome_fase = 'Luna Crescente';
    } else if (elong > 80 && elong < 100) {
      nome_fase = 'Primo Quarto';
    } else if (elong > 100 && elong < 170) {
      nome_fase = 'Gibbosa Crescente';
    } else if (elong > 170 && elong < 190) {
      nome_fase = 'Luna Piena';
    } else if (elong > 190 && elong < 260) {
      nome_fase = 'Gibbosa Calante';
    } else if (elong > 260 && elong < 280) {
      nome_fase = 'Ultimo Quarto';
    } else if (elong > 280 && elong < 350) {
      nome_fase = 'Luna Calante';
    } else if (elong > 350 && elong < 360) {
      nome_fase = 'Luna Nuova';
    }
  }

  if (LG == 'ENG') {
    if (elong > 0 && elong < 10) {
      nome_fase = 'New Moon';
    } else if (elong > 10 && elong < 80) {
      nome_fase = 'Waxing Crescent';
    } else if (elong > 80 && elong < 100) {
      nome_fase = 'First Quarter';
    } else if (elong > 100 && elong < 170) {
      nome_fase = 'Waxing Gibbous';
    } else if (elong > 170 && elong < 190) {
      nome_fase = 'Full Moon';
    } else if (elong > 190 && elong < 260) {
      nome_fase = 'Waning Gibbous';
    } else if (elong > 260 && elong < 280) {
      nome_fase = 'Last Quarter';
    } else if (elong > 280 && elong < 350) {
      nome_fase = 'Waning Crescent';
    } else if (elong > 350 && elong < 360) {
      nome_fase = 'New Moon';
    }
  }

  return nome_fase;
}

// *****************************  POSIZIONE DEI SATELLITI DI GIOVE ********************************************* //

function moons_jup(jd) {
  // funzione per il calcolo della posizione dei satelliti medicei di Giove
  // by Salvatore Ruiu -05-2012 Irgoli (Sardegna)
  // jd= numero del giorno giuliano per la data.

  var d = jd - 2415020; // numero di giorni dal 31-12-1899
  var V = 134.63 + 0.00111587 * d; // argomento del termine a lungo periodo.
  var M = 358.476 + 0.9856003 * d;
  var N = 225.328 + 0.0830853 * d + 0.33 * Math.sin(Rad(V));

  var J = 221.647 + 0.9025179 * d - 0.33 * Math.sin(Rad(V));

  var A = 1.916 * Math.sin(Rad(M)) + 0.02 * Math.sin(Rad(2 * M));
  var B = 5.552 * Math.sin(Rad(N)) + 0.167 * Math.sin(Rad(2 * N));

  var K = J + A - B;

  var R = 1.00014 - 0.01672 * Math.cos(Rad(M)) - 0.00014 * Math.cos(Rad(2 * M)); // raggio vettore della Terra.

  var RJ = 5.20867 - 0.25192 * Math.cos(Rad(N)) - 0.0061 * Math.cos(Rad(2 * N)); // raggio vettore di Giove.

  var dist = Math.sqrt(RJ * RJ + R * R - 2 * RJ * R * Math.cos(Rad(K))); // distanza Terra-Giove.

  // phi=angolo di fase in radianti.

  var phi = Math.asin((R * Math.sin(Rad(K))) / dist);

  phi = Rda(phi); // angolo di fase in gradi.

  var LON_ELIOC = 238.05 + 0.083091 * d + 0.33 * Math.sin(Rad(V)) + B;

  var Ds = 3.07 * Math.sin(Rad(LON_ELIOC + 44.5));
  var De =
    Ds -
    2.15 * Math.sin(Rad(phi)) * Math.cos(Rad(LON_ELIOC + 24)) -
    1.31 * ((RJ - dist) / dist) * Math.sin(Rad(LON_ELIOC - 99.4));

  // *** posizione dei satelliti di Giove - inizio.

  var u1 = 84.5506 + 203.405863 * (d - dist / 173) + phi - B; // Io.
  var u2 = 41.5015 + 101.2916323 * (d - dist / 173) + phi - B; // Europa.
  var u3 = 109.977 + 50.2345169 * (d - dist / 173) + phi - B; // Ganimede.
  var u4 = 176.3586 + 21.4879802 * (d - dist / 173) + phi - B; // Callisto.

  var G = 187.3 + 50.310674 * (d - dist / 173);
  var H = 311.1 + 21.569229 * (d - dist / 173);

  //  correzioni

  var delta_u1 = 0.472 * Math.sin(Rad(2 * (u1 - u2)));
  var delta_u2 = 1.073 * Math.sin(Rad(2 * (u2 - u3)));
  var delta_u3 = 0.174 * Math.sin(Rad(G));
  var delta_u4 = 0.845 * Math.sin(Rad(H));

  // distanze dei satelliti dal centro di Giove, in unità del raggio equatoriale di Giove.

  var r1 = 5.9061 - 0.0244 * Math.cos(Rad(2 * (u1 - u2)));
  var r2 = 9.3972 - 0.0889 * Math.cos(Rad(2 * (u2 - u3)));
  var r3 = 14.9894 - 0.0227 * Math.cos(Rad(G));
  var r4 = 26.3649 - 0.1944 * Math.cos(Rad(H));

  // u1,u2,u3,u4 corretti

  u1 = gradi_360(u1 + delta_u1);
  u2 = gradi_360(u2 + delta_u2);
  u3 = gradi_360(u3 + delta_u3);
  u4 = gradi_360(u4 + delta_u4);

  // coordinate apparenti rettangolari dei satelliti di Giove

  X1 = r1 * Math.sin(Rad(u1));
  Y1 = -r1 * Math.cos(Rad(u1)) * Math.sin(Rad(De));
  X2 = r2 * Math.sin(Rad(u2));
  Y2 = -r2 * Math.cos(Rad(u2)) * Math.sin(Rad(De));
  X3 = r3 * Math.sin(Rad(u3));
  Y3 = -r3 * Math.cos(Rad(u3)) * Math.sin(Rad(De));
  X4 = r4 * Math.sin(Rad(u4));
  Y4 = -r4 * Math.cos(Rad(u4)) * Math.sin(Rad(De));

  // Meridiano centrale di Giove: sistema II

  var long_m2 = 290.28 + 870.1869088 * (d - dist / 173) + phi - B;

  long_m2 = gradi_360(long_m2);

  // *** posizione dei satelliti di Giove - fine.
  //
  // u=0-360  corrisponde alla congiunzione inferiore del satellite (transita sul disco del pianeta se X,Y<1).
  // u=   90  corrisponde all'elongazione massima occidentale.
  // u=  180  corriponde alla congiunzione superiore.
  // u=  270  corriponde all'elongazione massima orintale.

  var pos_sat = new Array(
    X1,
    Y1,
    u1,
    X2,
    Y2,
    u2,
    X3,
    Y3,
    u3,
    X4,
    Y4,
    u4,
    long_m2,
    De,
  );

  return pos_sat;
}

function transit_grs(njd, angolo_grs) {
  // by Salvatore Ruiu -05-2012 Irgoli (Sardegna)
  // calcolo del transito della grande macchia rossa di Giove nel meridiano del pianeta.
  // longitudine della macchia rossa per il 2012,  angolo_grs=173°
  // 0.4135  rotazione di Giove in giorni.

  var pos_sat = 0;
  var delta_t = 100;

  while (delta_t > 0.01) {
    pos_sat = moons_jup(njd); // longitudine del meridiano centrale in questo momento.

    delta_t = Math.abs(pos_sat[12] - angolo_grs); // meridiano centrale e la macchia rossa.
    // prossimo transito della macchia rossa.
    // 870.6167=360/0.4135 corrisponde all'angolo descritto dalla rotazione di Giove in un giorno.
    njd = njd + delta_t / 870.6167;
  }

  return njd;
}

// *****************************************  TRANSITO DEI SATELLITI DI GIOVE **************************************** //

function transit_moonsjp(njd, nid) {
  // by Salvatore Ruiu :07-2012 Irgoli (Sardegna)
  // calcolo del transito dei satelliti di Giove per la data njd.
  // nid=numero del satellite 1=IO, 2=EUROPA, 3=GANIMEDE, 4=CALLISTO.
  // variabili di calcolo.

  var pos_sat = 0;
  var delta_t = 100;
  var njd1 = njd;
  var njd_in = 999;
  var njd_fc = 999;
  var njd_ex = 999;

  var raggio_sat = new Array(0, 5.9061, 9.3972, 14.9894, 26.3649); // raggio delle orbite lune di Giove.
  var diamet_app = new Array(0, 0.025, 0.022, 0.037, 0.034); // diametro apparente delle lune rispetto a Giove.
  var periodo = new Array(0, 1.769138, 3.551181, 7.154553, 16.689018); // periodo di rivoluzione del satellite in giorni.

  var L1 = 360 - Rda(Math.asin(1 / raggio_sat[nid]));

  var ve_angolare = 360 / periodo[nid]; // gradi percorsi in un giorno dal satellite.

  if (nid == 1) {
    R1 = 0;
    R2 = 1;
    R3 = 2;
  } // IO.
  if (nid == 2) {
    R1 = 3;
    R2 = 4;
    R3 = 5;
  } // EUROPA.
  if (nid == 3) {
    R1 = 6;
    R2 = 7;
    R3 = 8;
  } // GANIMEDE.
  if (nid == 4) {
    R1 = 9;
    R2 = 10;
    R3 = 11;
  } // CALLISTO.

  // ******************************** routine per il calcolo della longitudine (ingresso transito).

  while (Math.abs(delta_t) > 0.0006) {
    pos_sat = moons_jup(njd); //   posizione del satellite.
    x = pos_sat[R1]; // X coordinata cartesiana del satellite.
    y = pos_sat[R2]; // y coordinata cartesiana del satellite.
    A = pos_sat[R3]; // A longitudine del satellite.

    delta_t = (L1 - A) / ve_angolare;
    njd = njd + delta_t;
  } // fine routine  while (ingresso transito).

  var b = 1 - 0.06487;
  var b2 = b * b;
  var y2 = y * y; // correzione ingresso transito.

  if (Math.abs(y) < b) {
    delta_t1 = Math.sqrt((b2 - y2) / b2);
    angolo_d = 360 - Rda(Math.atan(delta_t1 / raggio_sat[nid]));

    delta_t1 = (angolo_d - L1) / ve_angolare;
    njd = njd + delta_t1; // giorno giuliano ingresso transito.
  }

  // ************************************ verifica  fase centrale del transito e uscita.

  if (Math.abs(y) < b) {
    pos_sat = moons_jup(njd);
    A = pos_sat[R3]; // posizione satellite dopo correzione.

    njd_in = njd; // ************* fase ingresso.

    njd_fc = njd + (360 - A) / ve_angolare; // ************* fase centrale.

    njd_ex = 2 * njd_fc - njd; // ************* fase uscita.
  }
  var event_sat = new Array(njd_in, njd_fc, njd_ex);
  //  Array             (ingresso, centrale, uscita)

  return event_sat;
} // fine funzione

// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------
//                                         FUNZIONE PER IL CALCOLO DELLE OPPOSIZIONI                             - INIZIO
// ----------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------

function opp_cong(njd, np) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) maggio 2012.
  // funzione per il calcolo delle opposizioni/congiunzioni.
  // njd=numero del giorno giuliano.
  // np=numero identificativo pianeta.

  var x = 100; // valore iniziale per le iterazioni

  var periodo = new Array(
    0.24085,
    0.61521,
    1.00004,
    1.88089,
    11.86224,
    29.45771,
    84.01247,
    164.79558,
    250.9,
  );

  // calcola il periodo sinodico del pianeta in giorni.

  var ps = Math.abs((periodo[2] * periodo[np]) / (periodo[2] - periodo[np]));
  ps = ps * 365.25636; // periodo sinodico in giorni.

  // *********************  PRIMA VERIFICA  **************************  - INIZIO

  var le = pos_pianeti(njd, np); // trova le longitudini eliocentriche della Terra e del pianeta (np).
  var LT = gradi_360(le[7] + 180); // longitudine eliocentrica della Terra.
  var LP = gradi_360(le[9]); // longitudine eliocentrica del pianeta (np).

  var delta_L1 = Math.abs(LP - LT);
  var delta_L2 = 360 - Math.abs(LP - LT);

  // ******************************************************************* PER I PIANETI ESTERNI.

  if (LP > LT && periodo[np] > periodo[2]) {
    x = (delta_L1 / 360) * ps;
  } else if (LP < LT && periodo[np] > periodo[2]) {
    x = (delta_L2 / 360) * ps;
  }

  // ******************************************************************* PER I PIANETI INTERNI.

  if (LP > LT && periodo[np] < periodo[2]) {
    x = (delta_L2 / 360) * ps;
  } else if (LP < LT && periodo[np] < periodo[2]) {
    x = (delta_L1 / 360) * ps;
  }

  // ******************************************************************************************

  njd = njd + x;

  // inizia il ciclo delle iterazioni.

  while (Math.abs(x) > 0.00001) {
    le = pos_pianeti(njd, np); // trova le longitudini eliocentriche della terra e del pianeta (np).
    LT = gradi_360(le[7] + 180); // longitudine eliocentrica della Terra.
    LP = gradi_360(le[9]); // longitudine eliocentrica del pianeta (np).

    // per i pianeti esterni.

    if (periodo[np] > periodo[2]) {
      x = ((LP - LT) / 360) * ps;
    }

    // per i pianeti interni.

    if (periodo[np] < periodo[2]) {
      x = ((LT - LP) / 360) * ps;
    }

    njd = njd + x; // giorno giuliano dell'evento.
  }

  // fine il ciclo di iterazioni.

  var dati = new Array(njd, LT, LP, ps); // risultati

  return dati;
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//                                               FUNZIONE PER IL CALCOLO DELLE OPPOSIZIONI                                     - FINE
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//                                                           STELLE DOPPIE                                                   - INIZIO
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

function double_stars(t, P, T, e, a, i, nodo, periastro) {
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) maggio 2012.
  // funzione per le stelle doppie.

  var n = 360 / P;
  var M = n * (t - T);
  M = gradi_360(M);

  var E = eq_keplero(M, e);

  var v = Rda(E[1]); // anomalia vera in gradi.

  var r_vettore = a * (1 - e * Math.cos(E[0])); // raggio vettore, E in radianti.

  var y = Math.sin(Rad(v + periastro)) * Math.cos(Rad(i));
  var x = Math.cos(Rad(v + periastro));

  var angolo_a = quadrante(y, x); //  individua il quadrante - angolo in gradi.

  var angolo_pol = gradi_360(angolo_a + nodo); //   angolo polare della stella.

  var s_angolare =
    (r_vettore * Math.cos(Rad(v + periastro))) / Math.cos(Rad(angolo_a));

  var dati = new Array(angolo_pol, s_angolare); // risultati: angolo polare e separazione angolare in secondi d'arco.

  return dati;
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//                                                           STELLE DOPPIE                                                     - FINE
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//                                                           ORBITA ELLITTICA                                                - INIZIO
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

function elliptic_orbit(njd, njp, W, LNOD, i, e, n, a, ma, cma, equinozio) {
  // funzione per il calcolo di un'orbita ellittica.
  // by Salvatore Ruiu Irgoli-Sardegna (Italy) maggio 2012.
  // parametri dell'orbita:
  //  njd=giorno giuliano della data.
  //  njp=giorno giuliano del passaggio del pianeta al perielio.
  //    W=argomento del perielio.
  // LNOD= longitudine del nodo ascendente.
  //    i=inclinazione dell'orbita.
  //    e=eccentricità.
  //    n=velocità giornaliera del pianeta in gradi.
  //    a=semiasse maggiore in UA.
  //   ma=magnitudine assoluta.
  //   cf=coefficiente di fase.
  // note: Longitudine del perielio=W+LNOD.

  var M = (njd - njp) * n; // anomalia media in gradi, per la data.
  M = gradi_360(M); // anomalia all'interno dell'intervallo 0° - 360°

  // ****************************************************** EQUAZIONE DI KEPLERO

  var av = eq_keplero(M, e); // anomalia vera in radianti.

  var rv = a * (1 - e * Math.cos(av[0])); // raggio vettore del pianeta: av[0]=E è già in radianti.

  var v = Rda(av[1]); // anomalia vera in gradi.

  var U = v + W; // argomento di Latitudine.

  var LL = U + LNOD;

  // calcolo delle coordinate rettangolari eclittiche del pianeta (x,y,z) per l'equinozio dato.

  var njde = calcola_jddata(1, 1, equinozio, 0, 0, 0);
  var OE = obli_ecli(njd); // obbliquità dell'eclittica in gradi.

  var x =
    rv *
    (Math.cos(Rad(U)) * Math.cos(Rad(LNOD)) -
      Math.sin(Rad(U)) * Math.sin(Rad(LNOD)) * Math.cos(Rad(i)));

  var a1 = Math.cos(Rad(U)) * Math.sin(Rad(LNOD));
  var b1 = Math.sin(Rad(U)) * Math.cos(Rad(LNOD)) * Math.cos(Rad(i));
  var c1 = Math.sin(Rad(U)) * Math.sin(Rad(i));

  var y =
    rv *
    (a1 * Math.cos(Rad(OE)) + b1 * Math.cos(Rad(OE)) - c1 * Math.sin(Rad(OE)));
  var z =
    rv *
    (a1 * Math.sin(Rad(OE)) + b1 * Math.sin(Rad(OE)) + c1 * Math.cos(Rad(OE)));

  // ****************************************  coordinate XYZ del Sole per l'equinozio indicato.

  var c_sun = Sun_XYZ(njd, equinozio);

  var Xs = c_sun[0];
  var Ys = c_sun[1];
  var Zs = c_sun[2];

  var Xp = Xs + x;
  var Yp = Ys + y;
  var Zp = Zs + z;

  var AR = quadrante(Yp, Xp) / 15;
  var DT = Math.sqrt(Xp * Xp + Yp * Yp + Zp * Zp); // Distanza Terra-Pianeta in UA.
  var DE = Rda(Math.asin(Zp / DT));

  var AF = afase_pianeta(njd, AR, DE, rv, DT); // Angolo di fase.

  var eff_sole = pos_sole(njd);

  var EL = elong(AR, DE, eff_sole[0], eff_sole[1]); // Elongazione in gradi dal Sole.

  var mag = magnitude_ast(ma, DT, rv, AF, cma); // magnitudine dell'oggetto.

  //var mag=ma+5*(Math.log(rv*DT))*0.4342+(cma*AF);           // magnitudine dell'oggetto.

  var dati = new Array(AR, DE, EL, DT, rv, mag, AF, x, y, z); // risultati:

  // risultati: AR=ascensione retta, DE=dleclinazione....

  return dati;
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
//                                                           ORBITA ELLITTICA                                                  - FINE
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

function magnitude_ast(ma, DT, RV, afase, cma) {
  // funzione per il calcolo della magnitudine di un pianeta_nano/asteroide utilizzando i parametri del (MPC).
  // 05-02-2013 Salvatore Ruiu (Italia - Sardegna).
  // ma=magnitudine assoluta (MPC).
  // DT=distanza Terra-pianeta.
  // RV=distanza pianeta-Sole.
  // afase=angolo di fase in gradi decimali.
  // cma=coefficiente di fase (MPC).

  var a = -0.4 * ma;

  var a1 = (1 - cma) * Math.pow(10, a);
  var a2 = cma * Math.pow(10, a);

  var af1 = Math.pow(Math.tan(Rad(afase / 2)), 0.63);
  var af2 = Math.pow(Math.tan(Rad(afase / 2)), 1.22);

  var caf = Math.cos(Rad(afase)); //  coseno dell'angolo di fase.

  var mass =
    -2.5 *
    Math.log(a1 * Math.exp(-3.33 * af1) + a2 * Math.exp(-1.87 * af2)) *
    0.4342;

  var mag_v =
    mass + 5 * Math.log(RV * DT) * 0.4342 - 2.5 * Math.log(caf) * 0.4342; // magnitudine visuale.

  return mag_v;
}

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------

function Sun_XYZ(njd, equinozio) {
  // ************************** COORDINATE RETTANGOLARI DEL SOLE PER L'EQUINOZIO DATO...

  // T=numero di secoli giuliani trascorsi dallo 0.5 gennaio 1900.

  var T = (njd - 2415020.0) / 36525;

  var L = 279.69668 + 36000.76892 * T + 0.0003025 * T * T; // Longitudine media del Sole per l'equinozio medio della data.
  var M = 358.47583 + 35999.04975 * T - 0.00015 * T * T - 0.0000033 * T * T * T; // Anomalia media del Sole per l'equinozio medio della data.
  var e = 0.01675104 - 0.0000418 * T - 0.000000126 * T * T; // Eccentricità.
  var a = 1.0000001124; // semiasse maggiore dell'orbita della Terra in UA.

  L = gradi_360(L);
  M = gradi_360(M);

  var avs = eq_keplero(M, e); // Equazione di Keplero: anomalia vera in radianti.
  var v1 = Rda(avs[1]); // anomalia vera in gradi.

  var LS = gradi_360(L + v1 - M); // Longitudine vera del Sole per l'equinozio medio della data.

  var Rv = a * (1 - e * Math.cos(avs[0])); // raggio vettore del Sole: avs[0]=E è già in radianti.

  // ********************************* PARAMETRI CORREZIONE ORBITA

  // correzioni ***************

  var A = 153.23 + 22518.7541 * T;
  var B = 216.57 + 45037.5082 * T;
  var C = 312.69 + 32964.3577 * T;
  var D = 350.74 + 445267.1142 * T - 0.00144 * T * T;
  var E = 231.19 + 20.2 * T;
  var H = 353.4 + 65928.7155 * T;

  // angoli in radianti.

  A = Rad(A);
  B = Rad(B);
  C = Rad(C);
  D = Rad(D);
  E = Rad(E);
  H = Rad(H);

  // correzione per la longitudine.

  var Delta_LL =
    0.00134 * Math.cos(A) +
    0.00154 * Math.cos(B) +
    0.002 * Math.cos(C) +
    0.00179 * Math.sin(D) +
    0.00178 * Math.sin(E);

  // correzioni per il raggio vettore.

  var Delta_R =
    0.00000543 * Math.sin(A) +
    0.00001575 * Math.sin(B) +
    0.00001627 * Math.sin(C) +
    0.00003076 * Math.cos(D) +
    0.00000927 * Math.sin(H);

  LS = LS + Delta_LL; // longitudine con le correzioni orbitali.
  Rv = Rv + Delta_R; // Raggio vettore con le correzioni orbitali.

  // coordinate rettangolari (XYZ) per l'equinozio della data indicata nella variabile njd.

  var OE = obli_ecli(njd); // obbliquità dell'eclittica in gradi per equinozio njd.

  // ***************************************************** Coordinate X,Y,Z per l'equinozio della data:(njd).

  var X = Rv * Math.cos(Rad(LS));
  var Y = Rv * Math.sin(Rad(LS)) * Math.cos(Rad(OE));
  var Z = Rv * Math.sin(Rad(LS)) * Math.sin(Rad(OE));

  // **********************************************************************************************************

  // Calcolare le coordinate rettangolari Xe,Ye,Ze, per l'equinozio standard indicato nel parametro data:(equinozio).

  var data = jd_data(njd); // recupera l'anno.
  var anno = data[2] * 1;

  var njde = calcola_jddata(1, 1, equinozio, 0, 0, 0); // giorno giuliano per la data dell'equinozio standard.

  var datiprec = precess(njd, njde, 10, 10);

  var psi = datiprec[2];
  var zet = datiprec[3];
  var omi = datiprec[4];

  // continua il calcolo delle coordinate rettangolari Xe,Ye,Ze, per l'equinozio standard.

  var Xx =
    Math.cos(Rad(psi)) * Math.cos(Rad(zet)) * Math.cos(Rad(omi)) -
    Math.sin(Rad(psi)) * Math.sin(Rad(zet));
  var Xy =
    Math.sin(Rad(psi)) * Math.cos(Rad(zet)) +
    Math.cos(Rad(psi)) * Math.sin(Rad(zet)) * Math.cos(Rad(omi));
  var Xz = Math.cos(Rad(psi)) * Math.sin(Rad(omi));

  var Yx =
    -Math.cos(Rad(psi)) * Math.sin(Rad(zet)) -
    Math.sin(Rad(psi)) * Math.cos(Rad(zet)) * Math.cos(Rad(omi));
  var Yy =
    Math.cos(Rad(psi)) * Math.cos(Rad(zet)) -
    Math.sin(Rad(psi)) * Math.sin(Rad(zet)) * Math.cos(Rad(omi));
  var Yz = -Math.sin(Rad(psi)) * Math.sin(Rad(omi));

  var Zx = -Math.cos(Rad(zet)) * Math.sin(Rad(omi));
  var Zy = -Math.sin(Rad(zet)) * Math.sin(Rad(omi));
  var Zz = Math.cos(Rad(omi));

  // Risultato finale: coordinate rettangolari (Xe,Ye,Ze,) del Sole, per l'equinozio standard indicato nel parametro data:(equinozio).

  var Xe = Xx * X + Yx * Y + Zx * Z;
  var Ye = Xy * X + Yy * Y + Zy * Z;
  var Ze = Xz * X + Yz * Y + Zz * Z;

  var datiXYZ = new Array(Xe, Ye, Ze, X, Y, Z, Rv);

  return datiXYZ;
}

//***********************************************************************************************************************************
//***********************************************************************************************************************************
//
// NOTE COMANDI JAVASCRIPT.
//
// utilizzare parseInt() per eliminare la parte decimale di un numero.
// Math.floor(x) Restituisce il numero intero approssimato per difetto del suo argomento || 13.5035 >> 13 || -13.5 >> - 14
// parseFloat() converte una stringa in un numero.
// for (i=0; i<alunni.length; i++) for (<inizializzazione_indice>; <condizione_da_valutare>; <incremento_indice> ) {   //istruzioni }
// toFixed(numero decimali da visualizzare)
// nomeArray.sort()  dispone in ordine alfabetico gli elementi dell'array.
// stringa.length  restituisce la lunghezza della stringa
// Math.pow per le funzioni esponenziali a^n= Math.pow(a,n)
//***********************************************************************************************************************************
//***********************************************************************************************************************************
