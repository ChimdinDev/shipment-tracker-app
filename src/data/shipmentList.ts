import { StatusType } from "@/components/molecule/Tag/StatusTag";

export interface ShipmentItem {
  id: string;
  trackingNumber: string;
  awb: string;
  status: StatusType;
  origin: {
    city: string;
    address: string;
  };
  destination: {
    city: string;
    address: string;
  };
}

export const shipmentList: ShipmentItem[] = [
  {
    id: '1',
    trackingNumber: '41785691423',
    awb: 'AWB',
    status: 'received',
    origin: {
      city: 'Cairo',
      address: 'Dokki, 22 Nile St.'
    },
    destination: {
      city: 'Alexandria',
      address: 'Smoha, 22 max St.'
    }
  },
  {
    id: '2',
    trackingNumber: '41785691424',
    awb: 'AWB',
    status: 'canceled',
    origin: {
      city: 'Cairo',
      address: 'Maadi, 15 Road 9'
    },
    destination: {
      city: 'Alexandria',
      address: 'Miami, 45 Beach Road'
    }
  },
  {
    id: '3',
    trackingNumber: '4178569145',
    awb: 'AWB',
    status: 'delivered',
    origin: {
      city: 'Cairo',
      address: 'Heliopolis, 10 Misr El Gedida'
    },
    destination: {
      city: 'Giza',
      address: 'Dokki, 5 Sudan St.'
    }
  },
  {
    id: '4',
    trackingNumber: '4178569146',
    awb: 'AWB',
    status: 'on-hold',
    origin: {
      city: 'Alexandria',
      address: 'El Montazah, 3 Aida St.'
    },
    destination: {
      city: 'Cairo',
      address: 'Maadi, 7 Road 9'
    }
  },
  {
    id: '5',
    trackingNumber: '4178569147',
    awb: 'AWB',
    status: 'error',
    origin: {
      city: 'Giza',
      address: 'Agouza, 12 El Sudan St.'
    },
    destination: {
      city: 'Alexandria',
      address: 'Kafr Abdo, 45 El Horreya St.'
    }
  },
  {
    id: '6',
    trackingNumber: '4178569148',
    awb: 'AWB',
    status: 'received',
    origin: {
      city: 'Cairo',
      address: 'Nasr City, 20 Abbas El Akkad'
    },
    destination: {
      city: 'Giza',
      address: 'Mohandessin, 15 El Mohandesin St.'
    }
  },
  {
    id: '7',
    trackingNumber: '4178569149',
    awb: 'AWB',
    status: 'canceled',
    origin: {
      city: 'Alexandria',
      address: 'El Raml, 8 El Mandara St.'
    },
    destination: {
      city: 'Cairo',
      address: 'Heliopolis, 10 El Merghany St.'
    }
  },
  {
    id: '8',
    trackingNumber: '4178569150',
    awb: 'AWB',
    status: 'delivered',
    origin: {
      city: 'Giza',
      address: 'El Haram, 20 Omar El Mokhtar'
    },
    destination: {
      city: 'Alexandria',
      address: 'El Shatby, 12 El Geish St.'
    }
  },
  {
    id: '9',
    trackingNumber: '4178569151',
    awb: 'AWB',
    status: 'on-hold',
    origin: {
      city: 'Cairo',
      address: 'Zamalek, 5 El Nil St.'
    },
    destination: {
      city: 'Alexandria',
      address: 'Smouha, 45 El Horreya St.'
    }
  },
  {
    id: '10',
    trackingNumber: '4178569152',
    awb: 'AWB',
    status: 'received',
    origin: {
      city: 'Alexandria',
      address: 'El Montazah, 3 Aida St.'
    },
    destination: {
      city: 'Cairo',
      address: 'Maadi, 7 Road 9'
    }
  }
];