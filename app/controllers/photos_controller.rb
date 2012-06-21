class PhotosController < ApplicationController
  def create
    @photo = Photo.new(params[:photo])
    @photo.image = File.new(upload_path)
    @photo.description = ALL_ANIMALS.sample["filename"]
    @photo.save

    redirect_to action: 'new'
  end

  def new
    @questions = ALL_QUESTIONS
    @animals = ALL_ANIMALS
  end

  def index
    @photos = Photo.all
  end
  
  def new_photos
    seen_ids = params[:seen_ids]    
  end

  def upload
    File.open(upload_path, 'w') do |f|
      f.write request.raw_post.force_encoding("UTF-8")
    end
    render :text => "ok"
  end

  private

  def upload_path # is used in upload and create
    file_name = session[:session_id].to_s + '.jpg'
    File.join(Rails.root, 'public', 'uploads', file_name)
  end
end
