class Buyer < ApplicationRecord
  belongs_to :agent
  serialize :citties, Array
end
