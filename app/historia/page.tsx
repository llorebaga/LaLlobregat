import type { Metadata } from "next";
import Image from "next/image";
import historyEvents from "../calendar-history.generated.json";
import { sitePath } from "../site-path";
import { HistoryArchive } from "./HistoryArchive";
import { HistoryMap } from "./HistoryMap";

export const metadata: Metadata = { title: "Història", description: "Gairebé cent anys de música, places i projectes de La Principal del Llobregat, des de la fundació a Cornellà el 1929." };
export const dynamic = "force-static";

const milestones = [
  { year: "1914", title: "L’arrel", text: "A Cornellà de Llobregat es forma l’Orquestra L’Artística Llobregatana, que durant un any porta el nom de Cobla-orquestra Llobregat. D’aquell planter en sortirà la cobla." },
  { year: "1929", title: "Els primers compassos", text: "Dídac Vilà i Moragues funda La Principal del Llobregat a Cornellà amb músics de L’Artística Llobregatana. És l’any que la cobla pren el nom que encara porta." },
  { year: "Anys 30", title: "Javimel al primer tible", text: "El fill del fundador, Jaume Vilà i Mèlich —Javimel—, consolida la formació des del primer tible. Compositor de sardanes com «Records de Can Ribot» i «Com dansen, les Violetes!», toca a la plaça d’Espanya de Barcelona i a la Festa de Germanor de la Font de Can Ribot, a la Colònia Güell." },
  { year: "1968", title: "Josep Vilà pren el relleu", text: "Gran intèrpret de flabiol, Josep Vilà i Figueras assumeix la direcció i la representació durant la segona meitat del segle XX, i situa la cobla entre les formacions més prestigioses del país." },
  { year: "Anys 70", title: "De la plaça al teatre", text: "La cobla és presència fixa al Portal de l’Àngel per la Mercè, a la plaça de la Catedral i fins al camp del FC Barcelona. El 1977 concursa al Premi Agustí Borguñó, al Teatre Municipal La Faràndula de Sabadell." },
  { year: "1978", title: "Fora de casa", text: "El retrat de Berlín obre una etapa de gires: Alemanya, Bèlgica, els Països Baixos i Gal·les, on la cobla dona el concert inaugural del Festival Internacional de Música de Llangollen." },
  { year: "1991", title: "Més enllà de les fronteres", text: "Representa Catalunya als Dies Catalans de Tunísia, i el seu so arriba fins a Nova York i l’Argentina. També esdevé capdavantera en l’acompanyament dels grans esbarts dansaires." },
  { year: "2004", title: "75 anys i Creu de Sant Jordi", text: "El 75è aniversari es celebra al Parc de Can Mercader de Cornellà, amb Josep Vilà i Antoni Ros-Marbà com a convidats d’excepció, i la Generalitat li atorga la Creu de Sant Jordi." },
  { year: "50+", title: "Una discografia extensa", text: "Més de cinquanta enregistraments documenten la seva evolució: el disc dirigit per Salvador Brotons (2004), les sardanes de Joan Jordi Beumala (2013), el treball del 90è aniversari (2019) i «Directe», enregistrat en viu al Pla de la Catedral de Barcelona. També hi consta l’adopció de la tenora barítona dins la cobla." },
  { year: "2025—26", title: "Nous diàlegs", text: "La Principal del Llobregat estrena un espectacle amb el Quartet Mèlt i obre el so de la cobla a noves complicitats, amb la veu lírica de Guillem Batllori i el piano d’Emma Stratton." },
  { year: "Avui", title: "Arrel i moviment", text: "Sota la direcció de Marcel Sabaté, la formació continua present en aplecs, cicles de concerts i festivals, mantenint viva una trajectòria que s’acosta al centenari." },
];

const archivePhotos = [
  { file: "01-anys-30.jpg", width: 480, height: 384, label: "Anys 30", context: "La cobla als seus primers anys, amb Jaume Vilà i Mèlich «Javimel» al primer tible.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "02-anys-30.jpg", width: 545, height: 366, label: "Anys 30", context: "A la Font de Can Ribot, a la Colònia Güell, durant la Festa de Germanor.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "03-any-1948.jpg", width: 985, height: 597, label: "Any 1948", context: "Foto feta al pati del Patronat Cultural Recreatiu de Cornellà. Poso les identitats amb alguna reserva..", names: "Darrere: Baldiri Dagà, Joan Tost, Joan Turú, Evarist Ballester, Gaspar Fontfreda i Jaume Vilà i Mèlich (\"Javimel\") Davant: Joan Mas, Vicenç Torruella, Ferran Blanch i Arché (\"Nando\") , Francesc Figueras i Salvador Plasencia.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "04-any-1962.jpg", width: 844, height: 855, label: "Any 1962", context: "Tocant a Barcelona durant les festes de la Mercè de 1962 al Portal de l'Àngel (al costat sembla que hi ha una altra Cobla).", credit: "Pere Català i Pic (Arxiu Pere Català i Roca). Arxiu Nacional de Catalunya. © Hereus de Pere Català i Pic" },
  { file: "05-any-1971.jpg", width: 1040, height: 648, label: "Any 1971", part: "1/2", context: "Concert a l'Auditori de la Caixa de Sabadell, el dia 26 de Desembre de 1971.", names: "Darrere: Santiago Rovira, Andreu Fernández i Polo, Cristóbal Moreno i Rama, Josep S*. Amorós, Jesús Iglesias i Jaume Vilà i Mèlich (\"Javimel\") Davant: Josep Vilà i Figueras, Miquel Felip i Carreras, Àngel Pont i Montaner, Josep Colomer i Ribera i Josep Juncosa. * La \"S\" és de Sánchez.", credit: "Arxiu Jaume Nonell. Fons Sabadell Sardanista" },
  { file: "06-any-1971.jpg", width: 1040, height: 648, label: "Any 1971", part: "2/2", context: "Concert a l'Auditori de la Caixa de Sabadell, el dia 26 de Desembre de 1971.", names: "Darrere: Santiago Rovira, Andreu Fernández i Polo, Cristóbal Moreno i Rama, Josep S*. Amorós, Jesús Iglesias i Jaume Vilà i Mèlich (\"Javimel\") Davant: Josep Vilà i Figueras, Miquel Felip i Carreras, Àngel Pont i Montaner, Josep Colomer i Ribera i Josep Juncosa. * La \"S\" és de Sánchez.", credit: "Arxiu Jaume Nonell. Fons Sabadell Sardanista" },
  { file: "07-any-1972.jpg", width: 992, height: 568, label: "Any 1972", context: "Retrat de formació.", names: "Darrere: Jaume Vilà i Mèlich (\"Javimel\"), Santiago Rovira, Andreu Fernández, Cristóbal Moreno, Jesús Iglesias, Josep S. Amorós i Josep (\"Pitu\") Moriscot i Pons, en el seu primer any a la formació. Davant: Josep Vilà i Figueras, Miquel Felip, Àngel Pont, Jaume Vilà i Figueras* i Josep Colomer i Ribera* * A tots dos els vaig tenir com a mestres de tenora, i em considero afortunat d'haver estat alumne seu.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "08-any-1972.jpg", width: 1200, height: 827, label: "Any 1972", context: "Abril de 1972, tocant davant dels magatzems Jorba, que es trobaven al Portal de l'Àngel, de Barcelona.", names: "Darrere: Jaume Vilà i Mèlich (\"Javimel\"), Santiago Rovira, Andreu Fernández, Cristóbal Moreno, Jesús Iglesias, Josep S. Amorós i Josep (\"Pitu\") Moriscot. Davant: Josep Vilà i Figueras, Miquel Felip, Àngel Pont, Josep Colomer i Jaume Vilà i Figueras.", credit: "Arxiu Jaume Nonell" },
  { file: "09-any-1973.jpg", width: 1200, height: 879, label: "Any 1973", context: "Actuant al camp de futbol de Cornellà.", names: "Darrere: Santiago Rovira, Andreu Fernández, Cristóbal Moreno, Jesús Iglesias i Josep S. Amorós Davant: Josep Vilà, Miquel Felip, Àngel Pont, Josep Colomer, Jaume Vilà i Josep (\"Pitu\") Moriscot.", credit: "Arxiu Anna Mª Pont i Soler" },
  { file: "10-any-1974.jpg", width: 483, height: 351, label: "Any 1974", context: "Al camp del F.C. Barcelona.", names: "Josep Vilà (flabiol), Enric Yáñez i Soria (2n tible), Àngel Pont (1er tible) i Jaume Vilà (1er tenor).", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "11-any-1974.jpg", width: 1200, height: 856, label: "Any 1974", context: "Retratats al Restaurant La Font del Gat, de Barcelona, el dia 16 de Novembre de 1974, durant l'homenatge a Sebastià Alba i Bertolín, amb motiu dels seus 25 anys com a Capdanser de la Colla Sardanista Violetes…", names: "Darrere: Vicenç Sepúlveda i Sanjaime, Andreu Fernández i Polo, Josep Jáimez i Mellizo, Pere Vergés i Plademunt, Josep S[ánchez i] Amorós i Josep (\"Pitu\") Moriscot i Pons Davant: Josep Vilà i Figueras, Enric Yáñez i Soria, Àngel Pont i Muntaner, Jaume Vilà i Figueras i Amadeu Escoda i Castellví (bolo, en substitució de Josep Colomer).", credit: "Arxiu Toni Balada" },
  { file: "12-any-1975.jpg", width: 1200, height: 859, label: "Any 1975", context: "Àngel Pont dirigint un concert que van fer al Casal del Metge, de Barcelona, el dia 17 de Maig de 1975. No reconec el flabiolaire (podria ser Josep Vilà). El 2n tible és Enric Yáñez.", credit: "Arxiu Anna Mª Pont i Soler" },
  { file: "13-any-1976.jpg", width: 1200, height: 800, label: "Any 1976", part: "1/2", context: "Dues instantànies preses a la Plaça de la Catedral de Barcelona, on només reconec Carles Soler i Cantón (1er tenor, de bolo) i Josep Colomer al 2n tenor. L'any el poso aproximat.", credit: "Arxiu Josep Carbonell i Mestre" },
  { file: "14-any-1976.jpg", width: 1200, height: 800, label: "Any 1976", part: "2/2", context: "Dues instantànies preses a la Plaça de la Catedral de Barcelona, on només reconec Carles Soler i Cantón (1er tenor, de bolo) i Josep Colomer al 2n tenor. L'any el poso aproximat.", credit: "Arxiu Josep Carbonell i Mestre" },
  { file: "15-any-1977.jpg", width: 1200, height: 845, label: "Any 1977", context: "Retrat de formació.", names: "Darrere: Jaume Salla i Estopà, Andreu Fernández i Polo, Josep Jáimez i Mellizo, Indaleci Boigues i Álvarez, Josep S[ánchez i] Amorós i Josep (\"Pitu\") Moriscot i Pons Davant: Josep Vilà i Figueras, Enric Yáñez i Soria, Jordi León i Royo, Jaume Vilà i Figueras i Josep Colomer i Ribera.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "16-any-1977.jpg", width: 1040, height: 648, label: "Any 1977", part: "1/2", context: "Concert al Teatre Municipal La Faràndula, de Sabadell, el dia 8 de Desembre de 1977, amb motiu del Concurs Premi Agustí Borguñó. Poso la mateixa alineació que en la foto anterior, però només es veu bé la cara d'alguns músics, i per tant hi podria haver alguna errada. A l'esquerra de la primera foto hi podem veure l'Amadeu Puntí i Jordà, contrabaixista en aquells moments de la Cobla-orquestra Montgrins.", names: "Darrere: Jaume Salla, Andreu Fernández, Josep Jáimez, Indaleci Boigues, Josep S. Amorós i Josep (\"Pitu\") Moriscot Davant: Josep Vilà, Enric Yáñez, Jordi León, Jaume Vilà i Josep Colomer.", credit: "Arxiu Jaume Nonell. Fons Sabadell Sardanista" },
  { file: "17-any-1977.jpg", width: 953, height: 589, label: "Any 1977", part: "2/2", context: "Concert al Teatre Municipal La Faràndula, de Sabadell, el dia 8 de Desembre de 1977, amb motiu del Concurs Premi Agustí Borguñó. Poso la mateixa alineació que en la foto anterior, però només es veu bé la cara d'alguns músics, i per tant hi podria haver alguna errada. A l'esquerra de la primera foto hi podem veure l'Amadeu Puntí i Jordà, contrabaixista en aquells moments de la Cobla-orquestra Montgrins.", names: "Darrere: Jaume Salla, Andreu Fernández, Josep Jáimez, Indaleci Boigues, Josep S. Amorós i Josep (\"Pitu\") Moriscot Davant: Josep Vilà, Enric Yáñez, Jordi León, Jaume Vilà i Josep Colomer.", credit: "Arxiu Jaume Nonell. Fons Sabadell Sardanista" },
  { file: "18-any-1978.jpg", width: 389, height: 327, label: "Any 1978", context: "Retrat de grup.", names: "En segon terme (3 a l'esquerra i 1 a la dreta): Josep S[ánchez i] Amorós (2n fiscorn), Amadeu Escoda i Castellví (1er tenor), Andreu Fernández i Polo (1er trompeta) i Jaume Salla i Estopà (2n trompeta). En primer terme (7): Enric Yáñez i Soria (2n tible), Indaleci Boigues i Álvarez (1er fiscorn), Jordi León i Royo (1er tible), Josep Vilà i Figueras (flabiol), Josep Jáimez i Mellizo (trombó), Josep [\"Pitu\"] Moriscot i Pons (contrabaix) i Josep Colomer i Ribera (2n tenor).", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "19-any-1978.jpg", width: 1200, height: 768, label: "Any 1978", context: "Fotografiats a Berlin.", names: "Drets: Jaume Salla (2n trompeta), Josep Jáimez (trombó), Jordi León (1er tible), Indaleci Boigues (2n fiscorn), Andreu Fernández (1er trompeta), Amadeu Escoda (1er tenor), Enric Yáñez (2n tible) i Josep Vilà (flabiol) Asseguts: Josep S. Amorós (2n fiscorn), Josep [\"Pitu\"] Moriscot (contrabaix) i Josep Colomer (2n tenor).", credit: "Arxiu Jaume Nonell" },
  { file: "20-any-1979.jpg", width: 1065, height: 766, label: "Any 1979", context: "Retrat de formació.", names: "Darrere: Jaume Salla, Andreu Fernández, Josep Jáimez, Indaleci Boigues i Josep S. Amorós Davant: Josep Vilà, Enric Yáñez, Francesc Benítez i Campos, Amadeu Escoda, Josep Colomer i Josep (\"Pitu\") Moriscot.", credit: "Arxiu Jaume Nonell" },
  { file: "21-any-1980.jpg", width: 1200, height: 836, label: "Any 1980", context: "Concert a Sant Feliu de Guíxols, juntament amb una Coral (que no surt a la imatge). Són els mateixos músics que en la foto anterior, encara que no es veuen tots.", credit: "Ajuntament de Girona, CRDI (Fons El Punt)" },
  { file: "22-any-1981.jpg", width: 300, height: 210, label: "Any 1981", context: "Al Parc de les Aigües de Cornellà de Llobregat.", names: "Drets: Josep Jáimez, Amadeu Escoda, Lluís Figuerola, Indaleci Boigues, Manel Oliveras i Rubiralta, Francesc Benítez, Josep Vilà, Josep (\"Pitu\") Moriscot i Enric Yáñez Asseguts: Andreu Fernández i Josep S. Amorós.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "23-any-1981.jpg", width: 1200, height: 795, label: "Any 1981", context: "Al Parc de les Aigües de Cornellà de Llobregat. Aquesta foto i l'anterior són fetes el mateix dia i en el mateix lloc, el Parc de les Aigües de Cornellà de Llobregat, segons m'indica en Manel Oliveras, que també em proporciona la identitat dels músics.", names: "D'esquerra a dreta: Josep Vilà, Amadeu Escoda, Josep (\"Pitu\") Moriscot, Andreu Fernández, Enric Yáñez, Josep Jáimez, Josep S. Amorós, Lluís Figuerola, Manel Oliveras, Francesc Benítez i Indaleci Boigues.", credit: "Arxiu Toni Balada" },
  { file: "24-anys-80.jpg", width: 1200, height: 885, label: "Anys 80", context: "Retrat de formació.", names: "Darrere: Joan Oliver, Andreu Fernández, Josep Jáimez, Indaleci Boigues, Josep S. Amorós i Josep (\"Pitu\") Moriscot Davant: Josep Vilà, Enric Yáñéz, Francesc Benítez, Amadeu Escoda i Manel Oliveras.", credit: "Arxiu Toni Balada" },
  { file: "25-any-1991.jpg", width: 1200, height: 843, label: "Any 1991", context: "Tocant al Casal de Llavaneres.", names: "Darrere: Desconegut, Andreu Fernánedez, Josep Jáimez (?), Indaleci Boigues, Rubèn Ginesta (amb qui vaig coincidir una temporada a la Cobla La Principal d'Olot) i Josep [\"Pitu\"] Moriscot Davant: Josep Vilà, Jordi Grifoll, Jordi Vilaró, Manel Oliveras i Amadeu Escoda.", credit: "Arxiu Toni Balada" },
  { file: "26-any-1994.jpg", width: 1200, height: 833, label: "Any 1994", context: "Retratats al Parc de Can Mercader, de Cornellà de Llobregat.", names: "Drets: Josep Vilà, Jordi Vilaró, Josep Malonda i Rodríguez [fiscorn], Amadeu Escoda, Jaume Vilà, Andreu Fernández i Jordi Grifoll Asseguts: Jordi Sacristán i Blázquez [trompeta], Christophe Cortale [trombó], Rubèn Ginesta i Josep (\"Pitu\") Moriscot.", credit: "Arxiu Toni Balada" },
  { file: "27-any-1998.jpg", width: 1200, height: 735, label: "Any 1998", context: "Retrat de formació.", names: "Darrere: Josep Lluís López (bolo), Àngel Vidal, Pere Montserrat, Josep Malonda, Josep Antoni Balada i Aguilà (a partir d'aquí l'anomeno Toni, com li agrada a ell) i Josep (\"Pitu\") Moriscot Davant: Josep Vilà, Jordi Grifoll, Jordi Vilaró, Jaume Vilà i Xavier Chacón.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "28-any-2001.jpg", width: 756, height: 475, label: "Any 2001", context: "22 d'Abril de 2001.", names: "Darrere: Desconegut, Jordi Pons, Pere Montserrat, Desconegut i Desconegut Davant: Josep Llauradó, Jordi Grifoll, Jordi Vilaró, Pere Benítez i Campos [?], Xavier Cornellana [?] i Tomàs Espanyó i Comelles.", credit: "Anna Ballesteros" },
  { file: "29-any-2004.jpg", width: 498, height: 336, label: "Any 2004", context: "El 75è aniversari, al Parc de Can Mercader de Cornellà.", names: "Darrere: Jordi Pons, Jordi Serrano i Quevedo, Pere Montserrat, Toni Balada, Rubèn Ginesta i Tomàs Espanyó Davant: Josep Llauradó, Jordi Grifoll, Jordi Vilaró, Pere Benítez i Campos i Xavier Cornellana.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "30-any-2004.jpg", width: 497, height: 315, label: "Any 2004", context: "Posant amb dos convidats d'excepció.", names: "Darrere: Jordi Serrano, Pere Montserrat, Pere Benítez, Xavier Cornellana, Toni Balada, Rubèn Ginesta i Tomàs Espanyó Davant: Jordi Pons, Josep Vilà i Figueras, Antoni Ros i Marbà, Josep Llauradó, Jordi Grifoll i Jordi Vilaró.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "31-any-2004.jpg", width: 1014, height: 664, label: "Any 2004", context: "A la Competició de Cobles (CoCo) de Banyoles, per Sant Martirià.", names: "Darrere: Jordi Pons, Jordi Serrano, Pere Montserrat, Toni Balada, Rubèn Ginesta i Tomàs Espanyó Davant: Josep Llauradó, Jordi Grifoll, Jordi Vilaró, Pere Benítez i Xavier Cornellana.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "32-any-2009.jpg", width: 1200, height: 716, label: "Any 2009", context: "Retrat de formació.", names: "Drets: Jordi Vilaró, Pere Benítez, Jordi Pons, Toni Balada, Joan Jordi Beumala, Ivan Babiloni, Jordi Serrano, Xavier Cornellana i Eugènia Camats Ajupits: Jordi Figaró i Pere Montserrat.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "33-any-2010.jpg", width: 1200, height: 796, label: "Any 2010", context: "Retrat de formació.", names: "Darrere: Jordi Pons, Jordi Serrano, Pere Montserrat, Ivan Babiloni, Toni Balada i Joan Jordi Beumala Davant: Jordi Figaró, Enric Sánchez i Teixidó, Jordi Vilaró, Pere Benítez i Xavier Cornellana.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "34-any-2011.jpg", width: 638, height: 378, label: "Any 2011", context: "Retrat de formació.", names: "Darrere: Jordi Pons, Jordi Serrano, Eduard Prats, Ivan Babiloni, Toni Balada i Joan Jordi Beumala Davant: Josep Llauradó, Jordi Campos, Jordi Vilaró, Pere Benítez i Xavier Cornellana.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "35-any-2011.jpg", width: 600, height: 400, label: "Any 2011", part: "1/2", context: "Escales amunt !", names: "D'esquerra a dreta: Jordi León (director), Toni Balada, Jordi Vilaró, Jordi Campos, Pere Benítez, Josep Llauradó, Joan Jordi Beumala, Jordi Pons, Eduard Prats, Xavier Cornellana, Ivan Babiloni i Jordi Serrano.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "36-any-2011.jpg", width: 723, height: 527, label: "Any 2011", part: "2/2", context: "Escales amunt !", names: "D'esquerra a dreta: Jordi León (director), Toni Balada, Jordi Vilaró, Jordi Campos, Pere Benítez, Josep Llauradó, Joan Jordi Beumala, Jordi Pons, Eduard Prats, Xavier Cornellana, Ivan Babiloni i Jordi Serrano.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "37-any-2012.jpg", width: 692, height: 461, label: "Any 2012", context: "Retrat de formació.", names: "Darrere: Jordi Pons, Jordi Serrano, Eduard Prats, Ivan Babiloni, Toni Balada i Àlex Roig Davant: Jordi León (director), Josep Llauradó, Jordi Campos, Jordi Vilaró, Pere Benítez i Xavier Cornellana.", credit: "Fons documental Cobles, orquestres i músics de Catalunya" },
  { file: "38-any-2014.jpg", width: 1200, height: 786, label: "Any 2014", part: "1/2", context: "Sequència de dues imatges a l'Aplec de Les Roquetes, el 26 d'Octubre de 2014.", names: "Darrere: Jordi Serrano, Jordi Pons, Toni Balada,  Ivan Babiloni, Eduard Prats i Àlex Roig Davant: Josep Llauradó, Jordi Campos, Jordi Vilaró, Xavier Cornellana i Pere Benítez.", credit: "Jaume Nonell" },
  { file: "39-any-2014.jpg", width: 1200, height: 775, label: "Any 2014", part: "2/2", context: "Sequència de dues imatges a l'Aplec de Les Roquetes, el 26 d'Octubre de 2014.", names: "Darrere: Jordi Serrano, Jordi Pons, Toni Balada,  Ivan Babiloni, Eduard Prats i Àlex Roig Davant: Josep Llauradó, Jordi Campos, Jordi Vilaró, Xavier Cornellana i Pere Benítez.", credit: "Jaume Nonell" },
  { file: "40-any-2016.jpg", width: 1200, height: 928, label: "Any 2016", context: "29è Aplec d'Encamp (Andorra), el 4 de Setembre de 2016.", names: "Darrere: Jordi Pons, Jordi Serrano, Toni Balada, Eduard Prats, Ivan Babiloni i Àlex Roig Davant: Josep Llauradó, Jordi Campos, Jordi Vilaró, Pere Benítez i Xavier Cornellana.", credit: "Jaume Nonell" },
  { file: "41-any-2017.jpg", width: 1200, height: 900, label: "Any 2017", context: "30è Aplec d'Encamp (Andorra), el 3 de Setembre de 2017.", names: "Darrere: Jordi Pons, Jordi Serrano, Toni Balada, Ivan Babiloni, Eduard Prats i Àlex Roig Davant: Josep Llauradó, Jordi Campos, Jordi Vilaró, Xavier Cornellana i Àlex Vila (bolo).", credit: "Jaume Nonell" },
];

const blogUrl = "https://fotosformacionsmusicalsdecatalunya.blogspot.com/";
const blogPostUrl = "https://fotosformacionsmusicalsdecatalunya.blogspot.com/2012/11/la-principal-del-llobregat_10.html";

export default function HistoriaPage() {
  return (
    <main id="contingut">
      <header className="historyHero"><div><p className="eyebrow light">Des de 1929</p><h1>Una història<br /><em>que encara sona.</em></h1></div><p className="historyLead">La nostra és una història de músics, famílies, places i públic. Una història feta de continuïtat —i de la voluntat de tornar a començar cada vegada que el flabiol fa la primera nota.</p></header>

      <section className="historyOpening sectionPad"><div className="bigYear" aria-hidden="true">1929</div><div className="openingText"><p className="eyebrow">El començament</p><h2>D’una iniciativa familiar a una cobla amb horitzó de país.</h2><p>La Principal del Llobregat va néixer a Cornellà de Llobregat de la mà de Dídac Vilà i Moragues, amb músics sortits de l’Orquestra L’Artística Llobregatana. El seu fill, Jaume Vilà i Mèlich —Javimel—, va consolidar la formació des del primer tible; a partir de 1968, el nét Josep Vilà i Figueras en va prendre el relleu com a director i representant.</p><p>Gairebé cent anys després, la cobla continua fent créixer aquell llegat amb repertori, enregistraments, viatges i projectes compartits.</p></div></section>

      <section className="timeline sectionPad" aria-label="Cronologia de La Principal del Llobregat">
        {milestones.map((item, index) => <article className="timelineItem" key={item.year}><span className="timelineIndex">{String(index + 1).padStart(2, "0")}</span><time>{item.year}</time><div><h2>{item.title}</h2><p>{item.text}</p></div></article>)}
      </section>

      <section className="historyArchive sectionPad" aria-labelledby="arxiu-title">
        <div className="historyArchiveHeading">
          <div>
            <p className="eyebrow">Àlbum del fons documental</p>
            <h2 id="arxiu-title">Gairebé un segle<br /><em>en imatges.</em></h2>
          </div>
          <p>
            Les {archivePhotos.length} fotografies del fons documental <em>Cobles,
            orquestres i músics de Catalunya</em>, dels anys trenta fins a l’aplec
            d’Encamp del 2017. Cada imatge conserva el crèdit de l’arxiu d’origen
            i, quan se’n coneixen, els noms dels músics que hi surten.
          </p>
        </div>

        <HistoryArchive photos={archivePhotos} thumbBase={sitePath("/historia/min/")} fullBase={sitePath("/historia/")} />
      </section>

      <section className="historyPortrait sectionPad" aria-labelledby="formacio-avui">
        <div className="historyPortraitHeading">
          <h2 id="formacio-avui">Formació actual</h2>
        </div>
        <div className="historyPortraitFrame">
          <Image
            src="/historia/formacio-actual.jpg"
            alt="Els intèrprets de La Principal del Llobregat amb els seus instruments"
            width={1500}
            height={742}
            sizes="(max-width: 760px) 100vw, 88vw"
          />
        </div>
        <div className="historyPortraitCaption">
          <span>Cobla La Principal del Llobregat</span>
          <span>Una formació · Un sol so</span>
        </div>
      </section>

      <section className="historyMapSection sectionPad" aria-labelledby="history-map-title">
        <div className="historyMapHeading">
          <div>
            <p className="eyebrow">La memòria del calendari</p>
            <h2 id="history-map-title">Una història<br /><em>sobre el territori.</em></h2>
          </div>
          <p>
            Explora les actuacions conservades al calendari de La Llobregat.
            Tria un any i clica qualsevol punt per descobrir on hem tocat.
          </p>
        </div>
        <HistoryMap events={historyEvents} mapSrc={sitePath("/catalunya-mapa-complet.png")} />
      </section>

      <section className="namesSection sectionPad">
        <p className="eyebrow light">Direccions i complicitats</p><h2>Una trajectòria feta<br />de moltes mirades.</h2>
        <p>La cobla ha treballat sota la batuta de mestres com Antoni Ros-Marbà, Salvador Brotons, Alfred Cañamero, Joan Lluís Moraleda, Jordi León, Francesc Benítez, Daniel Antolí i Marcel Sabaté. També ha compartit escenari amb formacions corals i instrumentals, i ha acompanyat els grans esbarts dansaires del país.</p>
        <div className="nameCloud" aria-label="Col·laboradors destacats"><span>Companyia Elèctrica Dharma</span><span>Miguel Poveda</span><span>Emma Stratton</span><span>Quartet Mèlt</span><span>Guillem Batllori</span><span>Orfeó Català</span><span>Cor Lieder Càmera</span><span>Cobla Sant Jordi — Ciutat de Barcelona</span><span>Esbart Dansaire de Rubí</span></div>
      </section>

      <section className="sourcesSection sectionPad">
        <div><p className="eyebrow">Per saber-ne més</p><h2>Fonts i memòria.</h2></div>
        <div className="sourceLinks"><a href={sitePath("/multimedia/biografia-la-principal-del-llobregat.pdf")} download>Biografia de la cobla <span>↓</span></a><a href={blogPostUrl} target="_blank" rel="noreferrer">Fons documental · La Principal del Llobregat <span>↗</span></a><a href="https://ca.wikipedia.org/wiki/La_Principal_del_Llobregat" target="_blank" rel="noreferrer">Viquipèdia <span>↗</span></a><a href="https://www.palaumusica.cat/1096647" target="_blank" rel="noreferrer">Palau de la Música Catalana <span>↗</span></a><a href="https://www.enciclopedia.cat/ec-gec-0019925.xml" target="_blank" rel="noreferrer">Enciclopèdia Catalana <span>↗</span></a></div>
        <p className="sourcesCredit">
          Les fotografies històriques i bona part de les dades d’aquesta pàgina
          provenen del fons documental <em>Cobles, orquestres i músics de
          Catalunya</em>, publicades amb permís del seu autor.{" "}
          <a href={blogUrl} target="_blank" rel="noreferrer">
            Vols saber més de la història de les diferents cobles? <span aria-hidden="true">↗</span>
          </a>
        </p>
      </section>

      <section className="historyCta"><p>La història continua a la pròxima plaça.</p><a className="button lightButton" href={sitePath("/agenda")}>Veure l’agenda <span>↗</span></a></section>
    </main>
  );
}
