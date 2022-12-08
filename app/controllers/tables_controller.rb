class TablesController < ApplicationController
  before_action :set_table, only: [:show, :edit, :update, :destroy]

  def index
    @tables = Table.all.order("created_at ASC")
  end

  def show
  end

  def new
    @table = Table.new
  end

  def edit
  end

  def create
    @table = Table.new()

    respond_to do |format|
      if @table.save
        Player.create(table: @table)
        @table.deal

        format.html { redirect_to @table, notice: "Table was successfully created." }
        format.json { render :show, status: :created, location: @table }
      else
        format.html { render :new }
        format.json { render json: @table.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @table.update(table_params)
        format.html { redirect_to @table, notice: "Table was successfully updated." }
        format.json { render :show, status: :ok, location: @table }
      else
        format.html { render :edit }
        format.json { render json: @table.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @table.destroy
    respond_to do |format|
      format.html { redirect_to tables_url, notice: "Table was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_table
    @table = Table.find(params[:id])
  end

  def table_params
    params.require(:table)
  end
end
