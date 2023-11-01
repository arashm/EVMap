# frozen_string_literal: true

class ChargerController < ApplicationController
  def index
    render json: Charger.all
  end

  def search
    result = GeoSearch::AddressSearch.call(search_params[:q])

    if result.valid?
      @chargers = result.chargers
      @location = result.location

      render :search
    else
      render json: { error: result.errors.first }, status: :not_found
    end
  end

  def search_params
    params.permit(:q)
  end
end
