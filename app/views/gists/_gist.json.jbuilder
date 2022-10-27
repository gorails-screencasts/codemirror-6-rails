json.extract! gist, :id, :title, :body, :created_at, :updated_at
json.url gist_url(gist, format: :json)
