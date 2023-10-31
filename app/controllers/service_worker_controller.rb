# frozen_string_literal: true

class ServiceWorkerController < ApplicationController
  protect_from_forgery except: :service_worker

  def service_worker
    respond_to do |format|
      format.js
    end
  end

  def manifest
    respond_to do |format|
      format.json
    end
  end
end
