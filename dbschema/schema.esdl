// EdgeDB Schema for Gundam Paradise

module default {
  type User {
    required id: uuid {
      default := uuid_generate_v4();
    }
    email: str;
    name: str;
    created_at: datetime {
      default := datetime_current();
    }
    updated_at: datetime {
      default := datetime_current();
    }
    wishlist_items: WishlistItem;
    collection_items: CollectionItem;
    price_alerts: PriceAlert;
  }

  type Store {
    required id: uuid {
      default := uuid_generate_v4();
    }
    required name: str {
      constraint exclusive;
    }
    required website: str;
    logo_url: str;
    created_at: datetime {
      default := datetime_current();
    }
    store_links: StoreLink;
  }

  type Kit {
    required id: uuid {
      default := uuid_generate_v4();
    }
    required name: str;
    required grade: str;  // HG, RG, MG, PG, SD, etc.
    series: str;  // UC, SEED, 00, Wing, etc.
    scale: str;  // 1/144, 1/100, 1/60, etc.
    release_date: datetime;
    image_url: str;
    description: str;
    created_at: datetime {
      default := datetime_current();
    }
    updated_at: datetime {
      default := datetime_current();
    }
    price_entries: PriceEntry;
    store_links: StoreLink;
    wishlist_items: WishlistItem;
    collection_items: CollectionItem;
    price_alerts: PriceAlert;
  }

  type StoreLink {
    required id: uuid {
      default := uuid_generate_v4();
    }
    required kit: Kit;
    required store: Store;
    required url: str;
    is_active: bool {
      default := true;
    }
    created_at: datetime {
      default := datetime_current();
    }
    updated_at: datetime {
      default := datetime_current();
    }
  }

  type PriceEntry {
    required id: uuid {
      default := uuid_generate_v4();
    }
    required kit: Kit;
    store: Store;
    required price: float64;
    currency: str {
      default := 'USD';
    }
    in_stock: bool {
      default := true;
    }
    recorded_at: datetime {
      default := datetime_current();
    }
  }

  type WishlistItem {
    required id: uuid {
      default := uuid_generate_v4();
    }
    required user: User;
    required kit: Kit;
    target_price: float64;
    notes: str;
    added_at: datetime {
      default := datetime_current();
    }
  }

  type CollectionItem {
    required id: uuid {
      default := uuid_generate_v4();
    }
    required user: User;
    required kit: Kit;
    purchase_price: float64;
    purchase_date: datetime;
    notes: str;
    added_at: datetime {
      default := datetime_current();
    }
  }

  type PriceAlert {
    required id: uuid {
      default := uuid_generate_v4();
    }
    required user: User;
    required kit: Kit;
    target_price: float64;
    alert_type: str;  // "price_drop", "back_in_stock", "sale"
    is_active: bool {
      default := true;
    }
    created_at: datetime {
      default := datetime_current();
    }
    triggered_at: datetime;
  }
}