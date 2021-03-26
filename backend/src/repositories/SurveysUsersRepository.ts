import { EntityRepository, Repository } from "typeorm";
import SurveyUser from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class SurveysUsers extends Repository<SurveyUser> {
    
}

export default SurveysUsers;