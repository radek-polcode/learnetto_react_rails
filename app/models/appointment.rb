class Appointment < ApplicationRecord
  validates :title, presence: true
end
