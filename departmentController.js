import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    // Use findAll instead of find for Sequelize
    const departments = await Department.findAll();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get department server error" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    // Attempt to create a new department record
    const newDep = await Department.create({
      dep_name,
      description,
    });

    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    console.error("Error in addDepartment:", error.message); // Log the exact error message
    return res
      .status(500)
      .json({ success: false, error: "add-department server error" });
  }
};

const editDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Ensure the id is extracted correctly from the URL

    // Find the department by ID
    const department = await Department.findByPk(id);

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    // Update department with new values from the body
    const { dep_name, description } = req.body;
    department.dep_name = dep_name || department.dep_name;
    department.description = description || department.description;

    await department.save(); // Save the updated department

    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error(error.message); // Log the exact error for debugging
    return res
      .status(500)
      .json({ success: false, error: "Edit department server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findByPk(id);

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    await department.destroy();
    return res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error in deleteDepartment:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Delete department server error" });
  }
};

export { addDepartment, deleteDepartment, editDepartment, getDepartments };
