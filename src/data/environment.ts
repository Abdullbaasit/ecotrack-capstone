export type Station = { id:string; name:string; area:string; air:number; water:number; temperature:number; humidity:number; status:'Good'|'Moderate'|'Needs attention' };
export const stations:Station[]=[
 {id:'ST-001',name:'Lagos Mainland',area:'Mainland',air:48,water:82,temperature:29.4,humidity:73,status:'Good'},
 {id:'ST-002',name:'Ikeja Central',area:'Ikeja',air:112,water:71,temperature:31.2,humidity:68,status:'Needs attention'},
 {id:'ST-003',name:'Victoria Island',area:'Island',air:38,water:85,temperature:28.7,humidity:78,status:'Good'},
 {id:'ST-004',name:'Lekki Peninsula',area:'Lekki',air:72,water:74,temperature:30.3,humidity:75,status:'Moderate'},
];
export type Alert={id:string;stationId:string;severity:'High'|'Medium'|'Low';title:string;detail:string;time:string};
export const alerts:Alert[]=[
 {id:'AL-101',stationId:'ST-002',severity:'High',title:'Elevated particulate indicator',detail:'Illustrative air-quality index exceeds the demo review threshold.',time:'Today · 09:15'},
 {id:'AL-102',stationId:'ST-004',severity:'Medium',title:'Moderate air quality',detail:'Review sample AQI trend for Lekki Peninsula.',time:'Today · 08:40'},
 {id:'AL-103',stationId:'ST-002',severity:'Medium',title:'Water index trending lower',detail:'Sample index warrants further investigation; not a drinking-water safety judgement.',time:'Yesterday · 16:20'},
 {id:'AL-104',stationId:'ST-001',severity:'Low',title:'Station check scheduled',detail:'Routine demonstration maintenance notice.',time:'Yesterday · 11:30'},
];
export const trend=[
 {day:'Mon',air:51,water:81,temp:29},{day:'Tue',air:63,water:79,temp:30},{day:'Wed',air:58,water:82,temp:30},{day:'Thu',air:71,water:76,temp:31},{day:'Fri',air:68,water:78,temp:30},{day:'Sat',air:74,water:77,temp:29},{day:'Sun',air:67,water:80,temp:30},
];
