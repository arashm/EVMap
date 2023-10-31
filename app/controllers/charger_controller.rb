# frozen_string_literal: true

class ChargerController < ApplicationController
  def index
    render json: Charger.all
  end
end
