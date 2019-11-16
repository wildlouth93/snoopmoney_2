json.set! :holdings do
  @holdings.each do |holding|
    json.set! holding.ticker do
      json.partial! 'holding', holding: holding 
    end
  end
end