import { createStore } from "vuex";

export default createStore({
  state: {
    
	message: '',
    isMoving: false,
    srcId: -1,
    srcParentId: -1,
    overId: -1,
    overParentId:-1,
    movingId: 0,
    doclist: [
      { 
        id: 1,
        name: "Обязательные для всех",
        description: 'Документы, обязательные для всех сотрудников без исключения',
        isSection: true,
        isOpen: false,
        circles: ['red','yellow','orange'],
        items: [
           {
        id: 4,
        name: "Паспорт",
        description: 'Для всех',
        isNecessary: true,
        circles:['cyan'],
        }, 
        {
        id: 5,
        name: 'ИНН',
        description: 'Для всех',
        isNecessary: true,
        
        }, 
        ]        
      },
      {
        id: 2,
        name: "Обязательные для трудоустройства",
        isSection: true,
        isOpen: false,
        description: 'Документы, без которых невозможно трудоустройство на какую либо должность в компании',
        items: [
        {
        id: 6,
        name: "Трудовой договор",
        circles:['blue','grey']
        }, 
        
        ],
        
      },
      {
        id: 3,
        name: "Специальные",
        isSection: true,
        isOpen: false,
        items: []
      },
      {
        id: 7,
        name: "Тестовое задание",
        description: 'Тестовое задание на выбранную должность, текст может быть длинным',
      },
      {
        id: 8,
        name: "Медкнижка",
        circles: ['green'],
        description: 'Нужно пройти медкомиссию',
      }
    ],

  },
  getters: {
    filteredList: state => {
        
      let filterMsg = state.message.toLowerCase();

      if (!filterMsg)
          return [...state.doclist];
        
      let newList = [];
      let dl = [...state.doclist];
      
      
      for (let i=0;i<dl.length;i++)
      {
          //решил сделать что если юзер ищет по имени секции, то показывать все содержимое секции, не фильтруя
          if (dl[i].isSection)
          {
              if (dl[i].name.toLowerCase().indexOf(filterMsg)>=0)
                  newList.push({...dl[i]});
              else //если же ищет по имени документа, то показывать секцию и внутри нее документы, подпадающие под условие
              {
                  let items = [...dl[i].items];
                  items = items.filter(e => e.name.toLowerCase().indexOf(filterMsg)>=0 )
                  
                  if (items.length>0)
                  {
                      let newObj = {...dl[i]}
                      newObj.items = [...items];
                      newList.push(newObj);  
                  }
              }
          }
          else if (dl[i].name.toLowerCase().indexOf(filterMsg)>=0)
              newList.push({...dl[i]});
          
       }
       
       return newList;
      
      //return state.doclist.filter(e => e.name.indexOf(state.message)>=0 );
    }
  },
  mutations: {
      startMove: (state, payload) => {
        
      state.srcId = payload.id;
      state.srcParentId = payload.parentId;
      
    },
      
     enterMove: (state, payload) => {
        
      state.overId = payload.id;
      state.overParentId = payload.parentId;
      
      
    },
    updateMessage: (state, payload) => {
      
      state.message = payload;
      
    },
    setOpenSection: (state, payload) => {

        let ind = state.doclist.findIndex(x=>x.id == payload);
        
        state.doclist[ind].isOpen = !state.doclist[ind].isOpen;
       
        return state;
       
    },
    editList: (state, payload) => {
       
        let srcId = payload.srcId;
        let srcParentId = payload.srcParentId;
        
        let srcInd = srcId;
        let srcParent = -1;
        
        if (srcParentId<0)
        {
            if (srcId>0)
                srcInd = state.doclist.findIndex(x => x.id === srcId);
        }
        else
        {
            srcParent =state.doclist.findIndex(x => x.id === srcParentId);
            srcInd = state.doclist[srcParent].items.findIndex(x => x.id === srcId);
        }
        
       let destInd = state.overId;
       let destParent = -1;
       
       if (state.overParentId<0)
       {
           if (state.overId>0)
               destInd = state.doclist.findIndex(x => x.id === state.overId);
       }
       else
       {
           destParent =state.doclist.findIndex(x => x.id === state.overParentId);
           destInd = state.doclist[srcParent].items.findIndex(x => x.id === state.overId);
       }
       
//       alert(srcInd+" "+srcParent+" -  "+destInd+" "+destParent);
       
       let newState = [...state.doclist];
       
       if (srcInd == destInd && srcParent == destParent) 
           return state;
       
       console.log(srcInd,srcParent,destInd,destParent);
       //на каком индексе кончаются секции
       let lastSectIndex = newState.filter(e=>e.isSection).length;
       
       //тип перемещаемого элемента
       let srcIsSection = false;
       
       if (srcParent<0)
          srcIsSection = newState[srcInd].isSection;
       
       let srcObj = null;
        
        //получили перемещаемый элемент,  плюс удалили его из массива        
        if (srcParent<0) 
            srcObj = newState.splice(srcInd,1)[0];
        else
            srcObj = newState[srcParent].items.splice(srcInd,1)[0];
        
        //если перемещаемый элемент - секция
        if (srcIsSection)
        {
            //если перемещаем не внутрь другой секции
            if (destParent<0) 
            {
                //если перемещаем секцию в раздел отдельных документов - то смещаем вниз списка секций
                if (destInd>=lastSectIndex) 
                   destInd = -2;
                
                if (destInd==-1 )
                    newState.splice(0,0,{...srcObj});            
                else if (destInd == -2)
                    newState.splice(lastSectIndex-1,0,{...srcObj});            
                else if (destInd<srcInd)
                    newState.splice(destInd+1,0,{...srcObj});             
                else if (destInd>srcInd)
                    newState.splice(destInd,0,{...srcObj});            
            }
            else 
                return state;
        }
        else
        {
            //если перемещаем документ в корень
            if (destParent<0)
            {
                //если пытаемся переместить его в раздел секций 
                    if (destInd<lastSectIndex && destInd>=0) 
                    {
                        newState[destInd].items.splice(0,0,{...srcObj});
                        
                    } else 
                    if (destInd==-1 )
                        newState.splice(lastSectIndex,0,{...srcObj});            
                    else if (destInd == -2)
                        newState.splice(newState.length,0,{...srcObj});            
                    else if (destInd<srcInd)
                        newState.splice(destInd+1,0,{...srcObj});             
                    else if (destInd>srcInd)
                        newState.splice(destInd,0,{...srcObj});            
            }
            else //если перемещаем в другую секцию
            {
                newState[destParent].items.splice(destInd+1,0,{...srcObj});
            }
        }
       
        state.doclist = [...newState];
    },
    
   },
   actions: {
       
        editList: ({ commit }, payload) => {
            
            commit("editList", payload);
        },   
           
        enterMove: ({ commit }, payload) => {
            
            commit("enterMove", payload);
        },
        updateMessage: ({ commit }, payload) => {
            
            commit("updateMessage", payload);
        },
        setOpenSection: ({ commit }, payload) => {
            
            commit("setOpenSection", payload);
        },   
       
    }
});