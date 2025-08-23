import {ref,watch,computed,nextTick} from 'vue'
export default function useFixed(groupRef,props){
    const TITLE_HEIGHT=30;

    const listHights=ref([]);
    const scrollY=ref(0);
    const currentIndex=ref(0);
    const distance=ref(0);
    
    const fixedTitle=computed(()=>{
        if(scrollY.value<0) return '';
        const currentGroup=props.data[currentIndex.value];
        return currentGroup?currentGroup.title:''
    })

    const fixedStyle=computed(()=>{
        const distanceVal=distance.value;
        const diff=(distanceVal>0 && distanceVal<TITLE_HEIGHT)?distanceVal - TITLE_HEIGHT:0;
        return {
            transform:`translate3d(0,${diff}px,0)`
        }
    })

    watch(()=>props.data,async()=>{
        await nextTick();
        calculate();
    })

    watch(scrollY,(newY)=>{
        const listHightVal=listHights.value
        for(let i=0;i<listHightVal.length-1;i++){
            const heightTop=listHightVal[i];
            const heightBottom=listHightVal[i+1];
            if(newY>=heightTop && newY<=heightBottom){
                currentIndex.value=i;
                distance.value=heightBottom-newY
            }
        }
    })

    function calculate(){
        const list=groupRef.value.children;
        const listHightVal=listHights.value
        let height=0;

        listHightVal.length=0;
        listHights.value.push(height);

        for(let i=0;i<list.length;i++){
            height+=list[i].clientHeight;
            listHightVal.push(height);
        }
    }

    function onScroll(pos){
        scrollY.value = -pos.y;
    }

    return {
        fixedTitle,
        onScroll,
        fixedStyle
    }
}