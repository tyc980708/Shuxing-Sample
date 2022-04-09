let loadedJSON;
let activeLanguage = "none";

function switchDynatext(){
    if(activeLanguage === "en"){
        activeLanguage = "zh";
    }
    else{
        activeLanguage = "en";

    }
    fetchDynatext(activeLanguage);
    window.location.href = "#?lang=" + activeLanguage;
}

function fetchDynatext(language){
    activeLanguage = language;
    let dynatextDescFile = "lang-" + language + ".json"
    //fetch file...
    fetch(dynatextDescFile).then(function(response){
        updateDynatext(response.json().then(
            data => updateDynatext(data)))
    }).catch(error => console.log("failed to fetch language json."))
}

function fetchDynatextString(language, key){
    if(activeLanguage !== language){
        fetchDynatext(language);
    }
    else{
        //lookup from the json:
        return loadedJSON[key];
    }
}

function fetchString(key){
    return fetchDynatextString(activeLanguage, key);
}

function updateDynatext(dynatextDescriptor){
    console.log(dynatextDescriptor)
    loadedJSON = dynatextDescriptor;
    let dynatextContainers = document.getElementsByClassName("dynatext")
    for(let i = 0; i < dynatextContainers.length; i++){
        let item = dynatextContainers.item(i)
        let attr = item.getAttribute("langdesc")
        if(attr){
            let dynatextContent = dynatextDescriptor[attr]
            if(dynatextContent){
                item.innerHTML = dynatextContent
                //console.log("updated text to" + dynatextContent)
            }
        }
    }
}


