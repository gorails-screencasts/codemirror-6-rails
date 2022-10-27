class Users::ImpersonatesController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin!

  def create
    user = User.find(params[:id])
    impersonate_user(user)
    redirect_to root_path
  end

  def destroy
    stop_impersonating_user
    redirect_to root_path
  end

  private

  def require_admin!
    redirect_to root_path unless current_user.admin?
  end
end
