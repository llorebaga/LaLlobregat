export type AgendaEvent = {
  id: string; day: string; month: string; dateTime: string; title: string;
  place: string; town: string; time: string; type: string; source: string;
  mapPosition: { left: string; top: string };
};

export const upcomingEvents: AgendaEvent[] = [
  { id: "vendrell-2026", day: "30", month: "AG.", dateTime: "2026-08-30T19:00:00+02:00", title: "Ballada d’estiu", place: "La Rambla", town: "El Vendrell", time: "19.00 h", type: "Ballada", source: "https://capitaldelasardana.cat/", mapPosition: { left: "48%", top: "71%" } },
  { id: "calella-2026", day: "06", month: "SET.", dateTime: "2026-09-06T19:30:00+02:00", title: "Toca sardanes, la cobla!", place: "Passeig de Manuel Puigvert", town: "Calella", time: "19.30 h", type: "Audició", source: "https://www.calellasardanista.cat/images/PROGRAMA%20TEMPORADA%202026.pdf", mapPosition: { left: "82%", top: "54%" } },
  { id: "calafell-2026", day: "10", month: "SET.", dateTime: "2026-09-10T19:00:00+02:00", title: "Ballada de sardanes", place: "Plaça Manila · Confraria", town: "Calafell", time: "19.00 h", type: "Ballada", source: "https://seu-e.cat/documents/3017083/21069719/Acta%2B7%2B2026.pdf/7b68377c-2181-480f-a6b0-8646f60e787e", mapPosition: { left: "49%", top: "73%" } },
  { id: "merce-2026", day: "27", month: "SET.", dateTime: "2026-09-27T11:00:00+02:00", title: "76è Concurs de colles sardanistes de la Mercè", place: "Pla de la Catedral", town: "Barcelona", time: "11.00 h", type: "Concurs", source: "https://app.somsardana.cat/competicio", mapPosition: { left: "69%", top: "63%" } },
];

export type ArchiveEvent = {
  year: string; date: string; title: string; town: string;
  category: "Concert" | "Sardanes" | "Projecte";
  description: string; link: string; mediaLabel: string;
};

export const archiveEvents: ArchiveEvent[] = [
  { year: "2026", date: "6 agost 2026", title: "Guillem Batllori & La Principal del Llobregat", town: "Palamós · Festival Amb So de Cobla", category: "Concert", description: "Una trobada entre la veu lírica, la cançó catalana i el color inconfusible de la cobla.", link: "https://ambsodecobla.cat/guillembatllori/", mediaLabel: "Veure el concert" },
  { year: "2026", date: "30 maig 2026", title: "Gran Final dels Premis Preludi", town: "La Garriga · Teatre El Patronat", category: "Concert", description: "Interpretació de les sardanes finalistes en una vetllada amb compositors, jurat i l’Esbart Dansaire de Rubí.", link: "https://somsardana.cat/sardanisme/agenda/504747", mediaLabel: "Veure la crònica" },
  { year: "2025", date: "10 juliol 2025", title: "Nits d’estiu", town: "Castellar del Vallès · Plaça del Mercat", category: "Sardanes", description: "Ballada a la fresca dins el programa de Nits d’Estiu de Castellar del Vallès.", link: "https://www.castellarvalles.cat/14352/acte/16034/", mediaLabel: "Veure l’actuació" },
  { year: "2019", date: "Estrena 2019", title: "Imparables", town: "Catalunya · Diversos escenaris", category: "Projecte", description: "Un espectacle teatral i musical que recorre cent anys d’història de Catalunya a través de cançons populars.", link: "https://brufaganya.cat/cobla-la-principal-del-llobregat-i-el-quartet-melt/", mediaLabel: "Descobrir el projecte" },
];
