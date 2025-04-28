class SetupController < ApplicationController
  def setup
    if current_user.teacher?
      # Check if the user already has an existing teacher profile
      @existing_teacher = current_user.teacher

      # If no existing teacher profile, create a new one
      if @existing_teacher.nil?
        @teacher = current_user.build_teacher
      else
        @teacher = @existing_teacher
      end

      redirect_to authenticated_user_path if @existing_teacher.present?
    else
      @existing_student = current_user.student

      if @existing_student.nil?
        @student = current_user.build_student
      else
        @student = @existing_student
      end
      redirect_to authenticated_user_path if @existing_student.present?
    end
  end

  def department_courses
    @courses = Course.where(department_id: params[:department_id])
    render json: @courses
  end  

  def create
    if current_user.teacher?
      @teacher = current_user.build_teacher(teacher_params)
      @teacher.college_id = current_user.college_id

      if @teacher.save
        current_user.update(profile_setup: true)
        redirect_to authenticated_user_path
      else
        render :setup
      end
    else
      @student = current_user.build_student(student_params)
      @student.college_id = current_user.college_id
      if @student.save
        current_user.update(profile_setup: true)
        redirect_to authenticated_user_path
      else
        render :setup
      end
    end
  end

  private

  def teacher_params
    params.require(:teacher).permit(:college_id, :department_id, :course_id)
  end

  def student_params
    params.require(:student).permit(:roll_no, :contact_no, :address, :department_id, course_ids: [])
  end
end
