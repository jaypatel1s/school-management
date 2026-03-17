# frozen_string_literal: true

class CountSerializer
  def self.new(collection)
    collection.count
  end
  
  def self.where_count(collection, conditions = nil)
    if conditions
      collection.where(conditions).count
    else
      collection.count
    end
  end
  
  def self.includes_count(collection, association)
    collection.includes(association).count
  end
end
