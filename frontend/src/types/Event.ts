export interface Event {
   id: string;
   title: string;
   image: string;
   dateStart: string;
   dateEnd?: string;  // `dateEnd` pode ser opcional, se não for sempre fornecido
   location: string;
   organizer: string;
} 