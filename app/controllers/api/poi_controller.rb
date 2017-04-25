module Api
  class PoiController < ApplicationController
    ALL_POI = [
        {id: 1, name: "Pipe Creek Vista", description: "This pullout can be accessed by private vehicle or by using the free Kaibab Rim Route (Orange) Shuttle Bus, departing from the Grand Canyon Visitor Center\n\nThe Canyon Rim Trail may be accessed here, with a 1.3 mile / 2.1 km walk on a paved trail west to Mather Point, or a 0.8 mile / 1.3 km walk east to the South Kaibab Trailhead."},
        {id: 2, name: "Yaki Point", description: "Yaki Point is the only viewpoint on Desert View Drive that is not accessible with a private vehicle. It can be reached using the free Kaibab Rim Route (Orange) Shuttle Bus departing from the Grand Canyon Visitor Center.\n\nYaki Point is a quiet place from which to enjoy sunset or sunrise."},
        {id: 3, name: "Grandview Point", description: "This popular viewpoint offers panoramic views of Grand Canyon from east to west, including several bends of the Colorado River to the east.\n\nThe historic Grandview Trail begins here. This trail is VERY steep! In the summer much of the trail is in full sun. In the winter ice and snow can make hiking treacherous. Always use caution on the Grandview Trail."},
        {id: 4, name: "Moran Point", description: "Geology is a prominent feature at any Grand Canyon viewpoint but at Moran Point three main rock groups are clearly visible. \n\nThe Layered Paleozoic Rocks represent the sedimentary rocks that make up most of the Grand Canyon's depth. The Grand Canyon Supergroup represents a significant portion of the canyon's geologic record even though it is only in isolated remnants, visible at only a few spots along the rim. The Vishnu Basement Rocks are the oldest at the canyon, consisting of both metamorphic and igneous rock."},
        {id: 5, name: "Navajo Point", description: "Just a few minutes west of the Desert View Watchtower, this viewpoint offers a great view of the watchtower as well as panoramic vistas to the west and a view north up the Colorado River.\n\nNavajo Point is the highest overlook on the South Rim - unless one is standing on the top observation deck of the watchtower itself. The top of the tower measures slightly higher."},
        {id: 6, name: "Desert View", description: "A short ¼-mile (½-km) walk leads from the parking area, past historic buildings, to the rim. From Desert View Point you can see the Colorado River make a big bend to the west. Climb the stairs to the top of the watchtower for outstanding views of the canyon.\n\nServices include the Visitor Center/ bookstore, (now in the historic Watchtower building) the trading post and snack bar, the general store, a service station, seasonal campground (April 16 - mid-October) and restrooms. The former Visitor Center building, on the edge of the parking area, is closed, but is scheduled to open in the near future as an American Indian Cultural Center."}
    ]

    def index
      poi_data = ALL_POI.map { |poi| {id: poi[:id], name: poi[:name]} }
      render json: {poi: poi_data}
    end

    def show
      poi = ALL_POI.find { |p| p[:id] == params[:id].to_i }
      if poi
        render json: poi
      else
        head :not_found
      end
    end
  end
end