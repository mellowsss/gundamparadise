CREATE MIGRATION m152y2elefdzmw23g5y5ilsba4b5fot77wyvxqo6knmj5bk4gtpgya
    ONTO initial
{
  CREATE TYPE default::CollectionItem {
      CREATE PROPERTY added_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY notes: std::str;
      CREATE PROPERTY purchase_date: std::datetime;
      CREATE PROPERTY purchase_price: std::float64;
  };
  CREATE TYPE default::Kit {
      CREATE LINK collection_items: default::CollectionItem;
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY grade: std::str;
      CREATE PROPERTY image_url: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE PROPERTY release_date: std::datetime;
      CREATE PROPERTY scale: std::str;
      CREATE PROPERTY series: std::str;
      CREATE PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::CollectionItem {
      CREATE REQUIRED LINK kit: default::Kit;
  };
  CREATE TYPE default::User {
      CREATE LINK collection_items: default::CollectionItem;
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::CollectionItem {
      CREATE REQUIRED LINK user: default::User;
  };
  CREATE TYPE default::PriceAlert {
      CREATE REQUIRED LINK kit: default::Kit;
      CREATE REQUIRED LINK user: default::User;
      CREATE PROPERTY alert_type: std::str;
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY is_active: std::bool {
          SET default := true;
      };
      CREATE PROPERTY target_price: std::float64;
      CREATE PROPERTY triggered_at: std::datetime;
  };
  ALTER TYPE default::Kit {
      CREATE LINK price_alerts: default::PriceAlert;
  };
  CREATE TYPE default::PriceEntry {
      CREATE REQUIRED LINK kit: default::Kit;
      CREATE PROPERTY currency: std::str {
          SET default := 'USD';
      };
      CREATE PROPERTY in_stock: std::bool {
          SET default := true;
      };
      CREATE REQUIRED PROPERTY price: std::float64;
      CREATE PROPERTY recorded_at: std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::Kit {
      CREATE LINK price_entries: default::PriceEntry;
  };
  CREATE TYPE default::StoreLink {
      CREATE REQUIRED LINK kit: default::Kit;
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY is_active: std::bool {
          SET default := true;
      };
      CREATE PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY url: std::str;
  };
  ALTER TYPE default::Kit {
      CREATE LINK store_links: default::StoreLink;
  };
  CREATE TYPE default::WishlistItem {
      CREATE REQUIRED LINK kit: default::Kit;
      CREATE REQUIRED LINK user: default::User;
      CREATE PROPERTY added_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY notes: std::str;
      CREATE PROPERTY target_price: std::float64;
  };
  ALTER TYPE default::Kit {
      CREATE LINK wishlist_items: default::WishlistItem;
  };
  ALTER TYPE default::User {
      CREATE LINK price_alerts: default::PriceAlert;
      CREATE LINK wishlist_items: default::WishlistItem;
  };
  CREATE TYPE default::Store {
      CREATE LINK store_links: default::StoreLink;
      CREATE PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY logo_url: std::str;
      CREATE REQUIRED PROPERTY name: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY website: std::str;
  };
  ALTER TYPE default::PriceEntry {
      CREATE LINK store: default::Store;
  };
  ALTER TYPE default::StoreLink {
      CREATE REQUIRED LINK store: default::Store;
  };
};
