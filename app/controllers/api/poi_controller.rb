module Api
  class PoiController < ApplicationController
    ALL_POI = [
        {id: 1, name: "Name 1", description: "Details 1"},
        {id: 2, name: "Name 2", description: "Details 2"},
        {id: 3, name: "Name 3", description: "Details 3"}
    ]

    def index
      poi_data = ALL_POI.map{|poi| {id: poi[:id], name: poi[:name]}}
      render json: {poi: poi_data}
    end

    def show
      poi = ALL_POI.find{|p| p[:id] == params[:id].to_i}
      if poi
        render json: poi
      else
        head :not_found
      end
    end
  end
end