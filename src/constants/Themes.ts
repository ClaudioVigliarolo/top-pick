
//"#ff9a00", "#ff7400", "#ff6a00", "#ff0000", "#ff4d00"
interface Colors{
    type:string,                   
    primaryOrange:string,                    
    lightGrey:string,                     
    secondaryIcon:string,                  
    searchIconColor:string,                 
    primaryText:string,                  
    drawerGrey:string,                     
    darkerOrange:string,                    
    lighterOrange:string,                   
    lighterGray:string,                   
    lightGray:string,                   
    checkOrange:string,                     
    primaryBackground:string,                 
    headerPrimary:string,                   
    primaryHeaderBackground:string,                      
    barColor:string,                  
    barTextColor:string,                 
    barExternalColor:string,                   
    bottomButtonsBackground:string,  
  lineColor:string

}

export enum Theme {
    light = 'light',
    dark = 'dark',
  }

const light:Colors = {
  type:"light",
  primaryOrange:'#FF851B', 
  lightGrey:"#C0C0C0",
  secondaryIcon: 'white',
  searchIconColor:'black',
  primaryText: 'black',
  drawerGrey:"#787878",
  darkerOrange: '#f4511e',
  lighterOrange: 'orange',
  lighterGray:'#e0e0e0',
  lightGray:'#c4c4c4',
  checkOrange:"#ffc757",
  primaryBackground: '#fff',
  headerPrimary: "#fff",
  primaryHeaderBackground: "#FF851B",
  barColor:"#fff",
  barTextColor:'black',
  barExternalColor:'#FF851B',
  bottomButtonsBackground:"#eee",
  lineColor:'rgba(196, 196, 196,0.4)',

};

const dark:Colors = {
  type:"dark",
  lightGrey:"#C0C0C0",
  drawerGrey:"#787878",
  primaryOrange:'#f4691e',
  searchIconColor:'#f4511e',
  secondaryIcon: '#f4511e',
  primaryText: '#eee',
  darkerOrange: '#f4511e',
  lighterOrange: 'orange',
  lighterGray:'#e0e0e0',
  lightGray:'#c4c4c4',
  checkOrange:"#ffc757",
  primaryBackground: 'black',
  headerPrimary: '#f4511e',
  primaryHeaderBackground: "#1F1F1F",
  barExternalColor:'black',
  barColor:"#1F1F1F",
  barTextColor:'#eee',
  bottomButtonsBackground:"#1F1F1F",
  lineColor:'rgba(196, 196, 196,0.4)',

};


export const getColor=<K extends keyof Colors>(theme:string, key: K): string=>
 {
    switch (theme) {
        case Theme.dark:
            return dark[key];
            
        case Theme.light:
                return light[key];
    
        default:
            return  light[key];
    }
  };
  
  
