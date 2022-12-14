const {createApp} = Vue;

createApp({


  data(){
    return {

      // Indice della conversazione attiva che permette il cambio tipo carousel
      activeConversation: 0,
      msgSentClass: 'sent',
      msgReceivedClass: 'received',

      // Base Dati dei contatti
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
              isOptionsVisible: false
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di stendere i panni",
              status: "sent",
              isOptionsVisible: false
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
              isOptionsVisible: false
            }
          ]
        },

        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
              isOptionsVisible: false
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
              isOptionsVisible: false
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
              isOptionsVisible: false
            }
          ]
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
              isOptionsVisible: false
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
              isOptionsVisible: false
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
              isOptionsVisible: false
            }
          ]
        },
        {
          name: "Alessandro B.",
          avatar: "_4",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
              isOptionsVisible: false
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
              isOptionsVisible: false
            }
          ]
        },

        {
          name: "Alessandro L.",
          avatar: "_5",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
              isOptionsVisible: false
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
              isOptionsVisible: false
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
              isOptionsVisible: false
            }
          ]
        },

        {
          name: "Claudia",
          avatar: "_6",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novit???",
              status: "sent",
              isOptionsVisible: false
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
              isOptionsVisible: false
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
              isOptionsVisible: false
            }
          ]
        },

        {
          name: "Federico",
          avatar: "_7",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che ?? il suo compleanno!",
              status: "sent",
              isOptionsVisible: false
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
              isOptionsVisible: false
            }
          ]
        },

        {
          name: "Davide",
          avatar: "_8",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
              isOptionsVisible: false
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho gia mangiata ieri, ordiniamo sushi!",
              status: "sent",
              isOptionsVisible: false
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
              isOptionsVisible: false
            }
          ]
        }

        

      ],
      // Campo di input per la ricerca delle chat
      searchChat: "",
      // Campo di input per ascoltare il nuovo messaggio
      newMsg: "",
      // Campo di input per ascoltare il nome del nuovo contatto
      newContactName: "",
      // Flag per mostrare o meno il campo di creazione della nuova chat
      isNewContact: false,
      // Variabile per storare la posizione sulle X al momento del touchStart
      touchStartX: 0,
      // Variabile per storare la posizione sulle X al momento del touchEnd
      touchEndX: 0,
      // Variabile per storare la direzione in cui si ha fatto swipe
      touchDirection: "",
      // Variabile per determinare quale classe assegnare in base allo swipe
      conversationSwipeLeftClass: 'sinistra',
      conversationSwipeRightClass: 'destra',
    }
  },

  methods: {

    // Funzione per creare ed aggiungere il nuovo messaggio dell'utente
    addUserMessage(){

      // Ad ogni invio di messaggio mi creo il timestap di quando ?? stato inviato, facendo i vari check per formattarlo come ?? formattato nel database
      let today = new Date().getDate()
      let hours = new Date().getHours()
      let minutes = new Date().getMinutes()
      let month = new Date().getMonth() +1
      let year = new Date().getFullYear()

      today < 10 ? today = `0${today}` : today = today
      hours < 10 ? hours = `0${hours}` : hours = hours
      minutes < 10 ? minutes = `0${minutes}` : minutes = minutes
      month < 10 ? month = `0${month}` : month = month

      let userMsg = {
        date: `${today}/${month}/${year} ${hours}:${minutes}:00`,
        message: this.newMsg,
        status: 'sent',
        isOptionsVisible: false
      }
      
      this.contacts[this.activeConversation].messages.push(userMsg)
      
      this.newMsg = ""
      this.addAiMessage()
    },
    // Funzione per la risposta automatica dell'AI con setTimeout
    addAiMessage(){
      

      setTimeout(()=>{

        let aiMsg = {
          date: "07/11/2022 15:00:00",
          message: "ok!",
          status: 'received',
          isOptionsVisible: false
        }
  
        this.contacts[this.activeConversation].messages.push(aiMsg)

      }, 1000)
    },
    // Funzione utility per estrarre la solamente l'ora ed i minuti dalla formattazione presente nella base dati
    getOnlyHours(msg){
      return msg.date.substring(11, 16)
    },
    // Funzione che filtra le chat in base al campo di input 
    searchFilter(){
      if(this.searchChat.length > 0){
        this.contacts.forEach(contact => contact.name.toLowerCase().includes(this.searchChat) ? contact.visible = true : contact.visible = false)
      }else {
        this.contacts.forEach(contact => contact.visible = true )
      }
    },
    // Funzione utility per prendere l'ultimo messaggio della chat e mostrarlo in preview. Soltanto fino a che la conversazione ha almeno un messaggio, altrimenti scrivo che la conversazione ?? vuota.
    getLastMsg(index){

      if(this.contacts[index].messages.length > 0){
         return this.contacts[index].messages[this.contacts[index].messages.length -1].message
      }else {
        return `Questa conversazione ?? vuota`
      }
     
    },
    // Funzione che va a cancellare il messaggio sul quale si ?? cliccato
    deleteMsg(index){

      setTimeout(()=> {
        this.contacts[this.activeConversation].messages[index].isOptionsVisible = false
        this.contacts[this.activeConversation].messages.splice(index, 1);

      }, 80)
    },
    // Funzione che mi assicura che posso aprire soltanto un men?? a tendina alla volta
    showOnlyOneDelete(message, index){
      //Prima itero tra tutti i messaggi e setto la flag che determina la visualizzazione su false
      this.contacts.forEach(contact => contact.messages.forEach(message => message.isOptionsVisible = false))
      message.isOptionsVisible = !message.isOptionsVisible
      //Poi prendo la conversazione dove sono, all'indice del messaggio sul quale ho cliccato che mi passo come parametro e a quel messaggi setto la flag true
      this.contacts[this.activeConversation].messages[index].isOptionsVisible = true
    },
    // Funzione che mi permette di creare una nuova chat
    createNewContact(name){

      let newContact = {
        name: name[0].toUpperCase() + name.substring(1),
        avatar: this.getRandomAvatar(),
        visible: true,
        messages: []
      }

      this.contacts.push(newContact)
      this.isNewContact = false
      this.newContactName = ""

    },
    // Utility che mi ritorna il template literal per un'immagine random dell'avatar
    getRandomAvatar(){
        let randomImg = this.generateRandomNumberInRange(1, 9)
        return `_${randomImg}`
      },
    // Utility per generare un numero casuale in range
    generateRandomNumberInRange(min, max){
      return Math.floor(Math.random() * (max - min) + min);
    },
    // Utility per eliminare tutte le tendine aperte cliccando ovunque nella conversazione
    clearAllOptions(){
      this.contacts.forEach(contact => contact.messages.forEach(message => message.isOptionsVisible = false))
    },
    // Funzione che mi cancella la conversazione al doppio click
    deleteChat(index){
      if(this.contacts.length >= 2){
        this.contacts.splice(index, 1)
        console.log(this.contacts.length)
      }else {
        alert("Non puoi eliminare il tuo ultimo contatto, aggiungine di nuovi cliccando sui tre puntini alla destra del tuo nome")
      }
    },
    // Funzione per mostrare l'opzione di cancellare la chat su schermo touch
    touchStart(e){
     this.touchStartX = e.changedTouches[0].screenX
    },

    touchEnd(contact, e){
      this.touchEndX = e.changedTouches[0].screenX
      this.checkDirection(this.touchStartX, this.touchEndX, contact)
    },

    checkDirection(start, end, contact){
      this.contacts.forEach(contact => contact.touchDirection = 'destra')
      if (end < start && start - end > 15) contact.touchDirection = "sinistra"
      if (end > start && end - start > 15) contact.touchDirection = "destra"


        }
    }
  



}).mount("#app")