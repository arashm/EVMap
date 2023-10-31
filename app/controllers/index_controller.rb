# frozen_string_literal: true

class IndexController < ApplicationController
  def index
    @charger = Charger.new
  end
end
